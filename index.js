const express = require('express')
require("dotenv").config()
const database = require('./config/database')
const Task = require('./api/v1/models/task.model')

database.connect()

const app = express()
const port = process.env.PORT

const routesAPI = require('./api/v1/routes/index.route')
routesAPI(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})