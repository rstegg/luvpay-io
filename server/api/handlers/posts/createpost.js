const { models } = require('../../../db')
const { Post } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = p => obj => Boolean(path([p], obj))

const validBody = pipe(
    path(['body']),
    allPass([
        validField('name'),
        validField('amount_type')
    ]))

const getValidSlug = slug =>
  new Promise(resolve =>
    Post.findOne({
      where: { slug }
    })
    .then(post => {
      if(post) {
        return resolve(getValidSlug(`${slug}-${shortId.generate().slice(0,1)}`))
      } else {
        return resolve(slug)
      }
    })
  )

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const slug =
    req.body.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidSlug(slug)
}

module.exports = (req, res) => {
  validate(req)
    .then(slug => {
      const safePost = merge({
        userId: req.user.id,
        amount: req.body.amount || '',
        image: req.body.image || '',
        description: req.body.description || '',
        slug
      }, pick(['name', 'amount_type', 'is_public'], req.body))
      return Post.create(safePost)
    })
    .then(post => res.status(200).json({post}))
    .catch(error => res.status(400).json({error}))
}
