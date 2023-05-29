const express = require('express')
const router = express.Router()

const {
    getAllBackups,
    addBackup
} = require('../controllers/backup')

router.get('/', getAllBackups)
router.post('/add', addBackup)

module.exports = router