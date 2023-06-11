const Backup = require('../models/backup');

module.exports = {

  getAllBackups: (req, res) => {
    /*
 #swagger.tags=['Backup']
 */
    Backup.find()
      .then((backups) => { res.status(200).send({ backups }); })
      .catch((error) => { res.status(404).send({ message: error.message }); });
  },
  addBackup: (req, res) => {
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
    const backup = new Backup(req.body);
    backup.save((error) => {
      if (error) res.status(404).send(error);
      else res.status(200).send(backup);
    });
  },
};
