const login = require('./login')
const signup = require('./signup')
const articles = require('./articles')
const posts = require('./posts')
const pages = require('./pages')
const profile = require('./profile')
const images = require('./images')
const feed = require('./feed')

module.exports = [
  login,
  signup,
  posts,
  articles,
  pages,
  profile,
  images,
  feed
]
