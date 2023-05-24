const express = require('express')
const bodyPasrer = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const websiteRouter = require('./api/routes/website')
const backupRouter = require('./api/routes/backup')

const app = express()

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            virsion: "1.0.0",
            descraption: "A simple express library API"
        },
        server: [
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["./routs/*.js"],
}
const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

dotenv.config()
app.use(cors());
const port = process.env.PORT

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
