const mongoose = require('mongoose')

const backupSchema = mongoose.Schema({
    backupId: mongoose.Schema.Types.ObjectId,
    // _id: mongoose.Schema.Types.ObjectId,
    
    siteId: {
        type: Number,
        require: true
    },

    description: {
        type: String,
        require: false
    },
})

module.exports = mongoose.model('Backup', backupSchema)