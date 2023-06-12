const {
  getAllWebsites,
  addWebsite,
  deleteWebsite,
} = require('../controllers/website');

// eslint-disable-next-line func-names
module.exports = function (router) {
  router.get('/website/', getAllWebsites);
  router.post('/website/', addWebsite);
  router.delete('/website/:id', deleteWebsite);
};
