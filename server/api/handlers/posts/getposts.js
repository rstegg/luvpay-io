const { models } = require('../../../db')
const { Post, User } = models

module.exports = (req, res) => {
  Post.findAll({
    include: [{
      model: User,
      attributes: ['image', 'username']
    }], where: { userId: req.user.id }})
    .then(posts => res.status(200).json({posts}))
    .catch(error => res.status(400).json({error}))
}
