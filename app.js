import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyPasrer from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import logger from './logger.js';
import websiteRoutes from './routes/website.js';
import backupRoutes from './routes/backup.js';
import { startConsumer } from './rabbitMQ/ReceivingMessage.js';

const swaggerFile = JSON.parse(readFileSync('./swagger_output.json'));

mongoose.set('strictQuery', true);

const app = express();

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

app.use(websiteRoutes);
app.use(backupRoutes);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(port, () => {
  logger.info(`my app is listening on http://localhost:${port}`);
});
startConsumer();
export default app;
