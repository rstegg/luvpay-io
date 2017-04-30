const login = require('./login')
const signup = require('./signup')
const posts = require('./posts')
const profile = require('./profile')
const images = require('./images')
const feed = require('./feed')
const account = require('./account')

module.exports = [
  login,
  signup,
  posts,
  profile,
  images,
  feed,
  account
]
