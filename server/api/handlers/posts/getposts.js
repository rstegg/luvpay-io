const { models } = require('../../../db')
const { Post } = models

module.exports = (req, res) => {
  Post.findAll({ where: { userId: req.user.id }})
    .then(posts => {
      res.status(200).json({posts})
    })
    .catch(error => res.status(400).json({error}))
}
