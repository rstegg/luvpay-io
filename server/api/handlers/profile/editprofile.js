const { models } = require('../../../db')
const { User } = models

const { allPass, path, pick, pipe } = require('ramda')

const validField = (p) => (obj) => Boolean(path([p], obj))

const validProfile = pipe(
    path(['body', 'profile']),
    allPass([
        validField('name')
    ]))

const validate = req => {
  if (!validProfile(req)) return Promise.reject('missing fields')

  return User.findOne({
      where: { username: req.body.profile.username }
  })
  .then(user =>
      user && user.id !== req.user.id ?
          Promise.reject('invalid user')
          : req.body.profile
  )
}

module.exports = (req, res) => {
  validate(req)
    .then(validatedUser => {
      const updatedUser = pick(['name', 'dob', 'bio'], req.body.profile)
      return User.update(updatedUser, { where: { id: req.user.id } })
    })
    .then(profile => res.status(200).json({profile}))
    .catch(error => res.status(400).json({error}))
}
