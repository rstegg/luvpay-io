const { models } = require('../../../db')
const { Article } = models

module.exports = (req, res) => {
  Article.findAll({ where: { userId: req.user.id }})
    .then(articles => {
      res.status(200).json({articles})
    })
    .catch(error => res.status(400).json({error}))
}
