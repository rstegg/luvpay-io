const router = require('express').Router()
const passport = require('passport')

const createPageHandler = require('../handlers/pages/createpage')
const editPageHandler = require('../handlers/pages/editpage')
const sharePageHandler = require('../handlers/pages/sharepage')
const getPagesHandler = require('../handlers/pages/getpages')
const getPageHandler = require('../handlers/pages/getpage')
const deletePageHandler = require('../handlers/pages/deletepage')

module.exports = () => {

  router.get(`/page/:id`,
    getPageHandler
  )

  router.get(`/pages`,
    passport.authenticate('jwt', { session: false }),
    getPagesHandler
  )

  router.post(`/pages`,
    passport.authenticate('jwt', { session: false }),
    createPageHandler
  )

  router.put(`/page/:id`,
    passport.authenticate('jwt', { session: false }),
    editPageHandler
  )

  router.post(`/share/page`,
    passport.authenticate('jwt', { session: false }),
    sharePageHandler
  )

  router.delete(`/page/:id`,
    passport.authenticate('jwt', { session: false }),
    deletePageHandler
  )

  return router
}
