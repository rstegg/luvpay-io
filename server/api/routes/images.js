const { models } = require('../../db')
const { User, Page } = models

const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const shortId = require('shortid')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1'
});

module.exports = () => {

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'payup-storage',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, shortId.generate() + '__' + Date.now().toString())
      }
    })
  })

  router.post(`/profile/avatar`, passport.authenticate('jwt', { session: false }), upload.single('avatar'), function(req, res) {
    User.update({image: req.file.location}, { where: { id: req.user.id } })
      .then(function(profile) {
        res.status(200).json({image: req.file.location})
      })
      .catch(function(err) {
        res.status(400).json({error: 'Bad request'})
      })
  })

  router.post(`/image/post`, passport.authenticate('jwt', { session: false }), upload.single('image'), function(req, res) {
      res.status(200).json({image: req.file.location})
  })

  router.post(`/image/post/free`, upload.single('image'), function(req, res) {
      res.status(200).json({image: req.file.location})
  })

  router.post(`/image/page`, passport.authenticate('jwt', { session: false }), upload.single('image'), function(req, res) {
      res.status(200).json({image: req.file.location})
  })

  router.post(`/image/page/:id`, passport.authenticate('jwt', { session: false }), upload.single('image'), function(req, res) {
    Page.update({ image: req.file.location }, { where: { id: req.params.id, userId: req.user.id }})
      .then(page => res.status(200).json({image: req.file.location}))
      .catch(error => res.status(400).json({error}))
  })

  return router
}
