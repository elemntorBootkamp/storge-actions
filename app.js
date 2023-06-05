const express = require('express');

const bodyPasrer = require('body-parser');

const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const dotenv = require('dotenv');

const websiteRouter = require('./routes/website');

const backupRouter = require('./routes/backup');

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
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
  });

app.use('/website', websiteRouter);
app.use('/backup', backupRouter);

app.listen(port, () => {
  console.log(`my app is listening on http://localhost:${port}`);
});
