const express = require('express');

const router = express.Router();

const {
  getAllWebsites,
  addWebsite,
  keycloakCheck,

} = require('../controllers/website');

router.get('/', getAllWebsites);
router.get('/getById/:id', getWebsiteById);
router.post('/add',keycloakCheck, addWebsite);


module.exports = router;
