const { models } = require('../../db')
const { User } = models

const jwt = require('jsonwebtoken')

const passport = require('passport')

const passportJWT = require("passport-jwt")
const passportLocal = require("passport-local")

module.exports = () => {

  const { ExtractJwt, Strategy: JwtStrategy } = passportJWT
  const { Strategy: LocalStrategy } = passportLocal

  const localStrategy = new LocalStrategy(
    function(username, password, done) {
      User.findOne({ where: { username: username } })
        .then(function (user) {
          if (!user) {
            return done(null, false, { error: 'Incorrect username' })
          }
          if (!user.validPassword(password)) {
            return done(null, false, { error: 'Incorrect password' })
          }
          return done(null, user)
        })
        .catch(function(err) {
          return done(err)
        })
    }
  )

  const jwtOptions = {}
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader()
  jwtOptions.secretOrKey = process.env.JWT_SECRET
  jwtOptions.ignoreExpiration = true

  const jwtStrategy = new JwtStrategy(jwtOptions,
    function(jwt_payload, done) {
      User.findById(jwt_payload.id)
        .then(function(user) {
          if(!user) {
            return done(null, false, { error: 'Invalid token' })
          }
          return done(null, user)
        })
        .catch(function(err) {
          return done(err)
        })
    }
  )

  passport.use(jwtStrategy)
  passport.use(localStrategy)
}
