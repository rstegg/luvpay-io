const { models } = require('../../db')
const { Post, User } = models

const router = require('express').Router()

const shortId = require('shortid')

module.exports = (options) => {
  router.get(`/feed`, (req, res) => {
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

  router.get(`/feed/:id`, (req, res) => {
    Post.findOne({ where: { slug: req.params.id, is_public: true }})
      .then(feed => {
        res.status(200).json({feed})
      })
      .catch(err => {
        res.status(400).json({error: 'Bad request'})
      })
  })

  return router
}
