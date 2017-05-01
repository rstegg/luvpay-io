const { models } = require('../../../db')
const { Article, User } = models

module.exports = (req, res) => {
  Article.findOne({
    include: [{
      model: User,
      attributes: ['image', 'username']
    }],
    where: { slug: req.params.id }
  })
  .then(article => {
    //TODO: return error if no article found
    res.status(200).json({article})
  })
  .catch(error => res.status(400).json({error}))
}
