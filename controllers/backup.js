import mongoose from 'mongoose';

import logger from '../logger.js';

import Backup from '../models/backup.js';

export const getAllBackups = (req, res) => {
  /*
#swagger.tags=['Backup']

*/const connectionParams = {
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

  Backup.find()
    .then((backups) => { res.status(200).send({ backups }); })
    .catch((error) => { res.status(404).send({ message: error.message }); });
};
export const addBackup = async (req, res) => {
  /*
#swagger.tags=['Backup']
*/
  /*
#swagger.parameters['backup'] = {
          in: 'body',
               required: true,
           schema: { $ref: "#/definitions/addBackup" }
       }
   */
  const backup = await new Backup(req.body);
  try {
    await backup.save();
    res.status(200).send(backup);
  } catch (err) {
    res.status(404).send(err);
  }
};
