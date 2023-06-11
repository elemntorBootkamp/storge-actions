const {
  getAllBackups,
  addBackup,
} = require('../controllers/backup');

// eslint-disable-next-line func-names
module.exports = function (router) {
  router.get('/backup/', getAllBackups);
  router.post('/backup/', addBackup);
};
