const { models } = require('../../../db')
const { Page, User } = models

module.exports = (req, res) => {
  Page.findOne({
    include: [{
      model: User,
      attributes: ['image', 'username']
    }],
    where: { slug: req.params.id }
  })
  .then(page => {
    //TODO: return error if no page found
    res.status(200).json({page})
  })
  .catch(error => res.status(400).json({error}))
}
