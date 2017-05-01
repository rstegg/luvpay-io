const { models } = require('../../../db')
const { Page } = models

module.exports = (req, res) => {
  Page.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then(page => {
      //TODO: return bad request if page not found
      res.status(200).json({page})
    })
    .catch(errror => res.status(400).json({error}))
}
