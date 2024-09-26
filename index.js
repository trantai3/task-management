const express = require('express')
require("dotenv").config()
const database = require('./config/database')
const bodyParser = require('body-parser')
const routesAPI = require('./api/v1/routes/index.route')


database.connect()

const app = express()
const port = process.env.PORT

// parse application/json
app.use(bodyParser.json())

routesAPI(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})