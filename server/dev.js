require('dotenv').load()

const path = require('path')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const passport = require('passport')
const db = require('./db')

const API_HOST = process.env.API_HOST || '/api/v1'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(cors())

const port = process.env.PORT || 3030
http.listen(port, function() {
  console.log(`Listening on port ${port}`)
})

const apiRoutes = require('./api/v1')()

app.use(`${API_HOST}`, apiRoutes)
