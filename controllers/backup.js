import Backup from '../models/backup.js';
import Website from '../models/website.js';
import sendToRabbitMQ from '../rabbitMQ/send_message.js';

export const getAllBackups = (req, res) => {
  /*
#swagger.tags=['Backup']
*/
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
export const backupSite = async (req, res) => {
  const website = await Website.findById(req.params.id).exec();
  const funcN = 'backupSite';
  sendToRabbitMQ(website, funcN);

  res.status(200).send({ message: 'The request has been forwarded for processing' });
};
