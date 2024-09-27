const express = require('express')
require("dotenv").config()
const database = require('./config/database')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const routesAPI = require('./api/v1/routes/index.route')

database.connect()

const app = express()
const port = process.env.PORT

// CORS
app.use(cors())

// cookie-parser
app.use(cookieParser())

// parse application/json
app.use(bodyParser.json())

routesAPI(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})