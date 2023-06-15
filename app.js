const express = require('express');
// eslint-disable-next-line import/order
const logger = require('./logger');
// const axios = require('axios');
// const pinoHTTP = require('pino-http');

const bodyPasrer = require('body-parser');

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const dotenv = require('dotenv');

const app = express();

require('./routes/website')(app);

require('./routes/backup')(app);

// eslint-disable-next-line import/no-extraneous-dependencies
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

dotenv.config();

const port = process.env.PORT;

app.use(bodyPasrer.json());

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_CONNECTION, connectionParams)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error(`Error connecting to MongoDB: ${error}`);
  });

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  logger.info(`my app is listening on http://localhost:${port}`);
});
