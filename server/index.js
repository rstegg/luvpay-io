require('dotenv').load()

const path = require('path')
const express = require('express')
const app = express()
const compress = require('compression')
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const Sequelize = require('sequelize')
const passport = require('passport')
const db = require('./db')

const API_HOST = process.env.API_HOST || '/api/v1'

app
  .use(express.static('./build'))
  .use(compress())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(passport.initialize())


const port = process.env.PORT || 8080
http.listen(port, function() {
  console.log(`Listening on port ${port}`)
})

app.use(`${API_HOST}`, require('./api/v1'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})
