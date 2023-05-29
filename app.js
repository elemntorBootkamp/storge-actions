const express = require('express')
const bodyPasrer = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require("cors");

const websiteRouter = require('./api/routes/website')
const backupRouter = require('./api/routes/backup')

const app = express()

dotenv.config()
app.use(cors());
const port= process.env.PORT

app.use(bodyPasrer.json())

const connectionParams = {
    useNewUrlParser: true,
}

mongoose.connect(process.env.DB_CONNECTION, connectionParams)
    .then(() => {
        console.log('connect to mongoDB');
    })
    .catch((error) => {
        console.log(`error: ${error}`);
    })

app.use('/website', websiteRouter)
app.use('/backup', backupRouter)

app.listen(port, () => {
    console.log(`my app is listening on http://localhost:${port}`);
})
