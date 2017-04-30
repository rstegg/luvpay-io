'use strict'
const router = require('express').Router()
const jwt = require('jsonwebtoken')

const routes = require('./routes')

const configureAuth = require('./service/auth')
const { mailgun } = require('./service/mail')
const stripe = require('./service/stripe')

module.exports = () => {
  //TODO: move configureAuth to local routes
  configureAuth()
  //feed each route the express app and options
  routes.map(route => router.use(route()))
  return router
}
