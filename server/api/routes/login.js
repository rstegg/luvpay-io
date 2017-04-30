const router = require('express').Router()

const passport = require('passport')
const jwt = require('jsonwebtoken')

module.exports = () => {
  router.post(`/login`, passport.authenticate('local', { session: false }), function(req, res) {
    const payload = { id: req.user.id }
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    res.json({ user: req.user, token: token })
  })

  return router
}
