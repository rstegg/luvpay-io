const { models } = require('../../db')
const { Post, User } = models

const router = require('express').Router()
const passport = require('passport')

module.exports = (options) => {
  router.get(`/feed/public`, (req, res) => {
    Post.findAll({
      include: [{
        model: User,
        attributes: ['image', 'username']
      }], where: { is_public: true }, limit: 10, order: [['createdAt', 'DESC']] })
      .then(feed => {
        res.status(200).json({feed})
      })
      .catch(err => {
        res.status(400).json({error: 'Bad request'})
      })
  })

  router.get(`/feed`, passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findAll({
      include: [{
        model: User,
        attributes: ['image', 'username']
      }], where: {
        $or: [
          { post_type: { $any: req.user.interest_types } },
          { research_type: { $any: req.user.interests } }
        ]
      }
    })
    .then(feed => {
      res.status(200).json({feed})
    })
    .catch(error => res.status(400).json({error}))
  })

  return router
}
