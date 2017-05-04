const { models } = require('../../../db')
const { Post } = models

module.exports = (req, res) => {
  Post.destroy({ where: { id: req.params.id, userId: req.user.id } })
    .then(post => {
      res.status(200).json({post})
    })
    .catch(errror => res.status(400).json({error}))
}
