const express = require('express')
const router = express.Router()

const {
    getAllWebsites,
    addWebsite
} = require('../controllers/website')

router.get('/', getAllWebsites)
router.post('/', addWebsite)

module.exports = router