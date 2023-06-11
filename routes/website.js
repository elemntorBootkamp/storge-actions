const {
  getAllWebsites,
  addWebsite,
} = require('../controllers/website');

// eslint-disable-next-line func-names
module.exports = function (router) {
  router.get('/website/', getAllWebsites);
  router.post('/website/', addWebsite);
};
