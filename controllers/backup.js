const Backup = require('../models/backup');

module.exports = {

  getAllBackups: (req, res) => {
    Backup.find()
      .then((backups) => { res.status(200).send({ backups }); })
      .catch((error) => { res.status(404).send({ message: error.message }); });
  },
  addBackup: (req, res) => {
    const backup = new Backup(req.body);
    backup.save((error) => {
      if (error) res.status(404).send(error);
      else res.status(200).send(backup);
    });
  },
};
