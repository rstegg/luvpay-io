const { models } = require('../../../db')
const { Article, User } = models

module.exports = (req, res) => {
  Article.findAll({
    include: [{
      model: User,
      attributes: ['image', 'username']
    }], where: { userId: req.user.id }})
    .then(articles => res.status(200).json({articles}))
    .catch(error => res.status(400).json({error}))
}
