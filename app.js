const express = require('express')
const bodyPasrer = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const dotenv = require('dotenv')
const app=express();
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
//const http = require('http')
//const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const websiteRouter = require('./routs/website')
const backupRouter = require('./routs/backup')



app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile))

dotenv.config()
// app.use(cors());
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
