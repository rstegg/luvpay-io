const { models } = require('../../../db')
const { User } = models
const jwt = require('jsonwebtoken')

const crypto = require('crypto')
const mailcomposer = require('mailcomposer')
const shortId = require('shortid')

const { confirmationMail, sendConfirmation } = require('../../service/mail')

const { allPass, not, merge, path, pick, pipe, reduceWhile } = require('ramda')

const bytes = (n) => crypto.randomBytes(n).toString('hex')

const validField = (p) => (obj) => Boolean(path([p], obj))

const validBody = pipe(
    path(['body', 'user']),
    allPass([
        validField('name'),
        validField('email'),
        validField('password'),
        validField('username')
    ]))

const ipFields = [
  ['ip'],
  ['headers', 'x-forwarded-for'],
  ['connection', 'remoteAddress'],
  ['socket', 'remoteAddress'],
  ['connection', 'socket', 'remoteAddress']
]

const getIp = (req) => reduceWhile(not, (acc, p) => path(p, req), '', ipFields) || ''

const createPermalink = (email) =>
    `${email}${bytes(4)}`
        .toLowerCase()
        .replace(' ', '')
        .replace(/[^\w\s]/gi, '')
        .trim()

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  return User.findOne({
      where: { email: req.body.user.email }
  })
  .then(user =>
      user ?
          Promise.reject('email registered') :
          User.findOne({ where: { username: req.body.user.username } })
  )
  .then(user =>
      user ?
          Promise.reject('username taken') :
          req.body.user
  )
}

module.exports = (req, res) => {
    validate(req)
      .then(validatedUser => {

        const salt = (Math.floor(Math.random() * 1000000000)).toString(36)
        const hash = crypto.createHash('md5').update(validatedUser.password + salt).digest('hex')
        const ip = getIp(req)
        const permalink = createPermalink(validatedUser.email)
        const verify_token = bytes(20)
        const user = merge({
          password: hash,
          salt,
          ip_address: ip,
          verified: false,
          permalink,
          verify_token
        }, pick(['email', 'name', 'username'], validatedUser))

        //We can return this Promise to un-nest the mail sending stuff, and then we don't need to
        //duplicate the error handling.

        return User.create(user)
      })
      .then(createdUser => {
        const { permalink, verify_token } = createdUser
        const permalink_url = `https://kuwau.com/api/v1/signup/email_confirmation/${permalink}/${verify_token}`
        const mail = confirmationMail(createdUser, permalink_url)
        sendConfirmation(mail, createdUser)
        const resUser = pick(['id', 'email', 'name', 'username'], createdUser)
        const token = jwt.sign({ id: createdUser.id }, process.env.JWT_SECRET)
        res.status(200).json({user: resUser, token})
      })
      .catch((error) => res.status(400).json({error}))
}
