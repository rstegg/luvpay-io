const router = require('express').Router()
const passport = require('passport')

const createArticleHandler = require('../handlers/articles/createarticle')
const editArticleHandler = require('../handlers/articles/editarticle')
const shareArticleHandler = require('../handlers/articles/sharearticle')
const getArticlesHandler = require('../handlers/articles/getarticles')
const getArticleHandler = require('../handlers/articles/getarticle')
const deleteArticleHandler = require('../handlers/articles/deletearticle')

module.exports = () => {

  router.get(`/article/:id`,
    getArticleHandler
  )

  router.get(`/articles`,
    passport.authenticate('jwt', { session: false }),
    getArticlesHandler
  )

  router.post(`/articles`,
    passport.authenticate('jwt', { session: false }),
    createArticleHandler
  )

  router.put(`/article/:id`,
    passport.authenticate('jwt', { session: false }),
    editArticleHandler
  )

  router.post(`/share/article`,
    passport.authenticate('jwt', { session: false }),
    shareArticleHandler
  )

  router.delete(`/article/:id`,
    passport.authenticate('jwt', { session: false }),
    deleteArticleHandler
  )

  return router
}
