const { models } = require('../../../db')
const { Post, User } = models

module.exports = (req, res) => {
  Post.findOne({
    include: [{
      model: User,
      attributes: ['image', 'username']
    }],
    where: { slug: req.params.id }
  })
  .then(post => {
    //TODO: return error if no post found
    res.status(200).json({post})
  })
  .catch(error => res.status(400).json({error}))
}
