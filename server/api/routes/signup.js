const router = require('express').Router()

const { prop } = require('ramda');

const validateBody = require('../middleware/validate-body')

const signupHandler = require('../handlers/user/signup')
const verifyTokenHandler = require('../handlers/user/verifytoken')
const validateEmailHandler = require('../handlers/user/validateemail')
const validateUsernameHandler = require('../handlers/user/validateusername')

module.exports = () => {
  router.post(`/signup`,
    signupHandler
  )

  router.post(`/signup/validate_email`,
    validateBody(prop('email'), 'missing email'),
    validateEmailHandler
  )

  router.post(`/signup/validate_username`,
    validateBody(prop('username'), 'missing username'),
    validateUsernameHandler
  )

  router.get(`/signup/email_confirmation/:permalink/:verify_token`, verifyTokenHandler)

  return router
}
