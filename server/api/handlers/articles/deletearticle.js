const { models } = require('../../../db')
const { Article } = models

module.exports = (req, res) => {
  Article.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then(article => {
      //TODO: return bad request if article not found
      res.status(200).json({article})
    })
    .catch(errror => res.status(400).json({error}))
}
