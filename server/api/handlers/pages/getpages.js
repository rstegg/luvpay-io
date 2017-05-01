const { models } = require('../../../db')
const { Page } = models

module.exports = (req, res) => {
  Page.findAll({ where: { userId: req.user.id }})
    .then(pages => {
      res.status(200).json({pages})
    })
    .catch(error => res.status(400).json({error}))
}
