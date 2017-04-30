const router = require('express').Router()
const passport = require('passport')

const createPostHandler = require('../handlers/posts/createpost')
const editPostHandler = require('../handlers/posts/editpost')
const sharePostHandler = require('../handlers/posts/sharepost')
const getPostsHandler = require('../handlers/posts/getposts')
const getPostHandler = require('../handlers/posts/getpost')
const deletePostHandler = require('../handlers/posts/deletepost')

module.exports = () => {

  router.get(`/post/:id`,
    getPostHandler
  )

  router.get(`/posts`,
    passport.authenticate('jwt', { session: false }),
    getPostsHandler
  )

  router.post(`/posts`,
    passport.authenticate('jwt', { session: false }),
    createPostHandler
  )

  router.put(`/post/:id`,
    passport.authenticate('jwt', { session: false }),
    editPostHandler
  )

  router.post(`/share/post`,
    passport.authenticate('jwt', { session: false }),
    sharePostHandler
  )

  router.delete(`/post/:id`,
    passport.authenticate('jwt', { session: false }),
    deletePostHandler
  )

  return router
}
