const { models } = require('../../../db')
const { Page } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = p => obj => Boolean(path([p], obj))

const validBody = pipe(
    path(['body']),
    allPass([
        validField('name'),
        validField('post_type')
    ]))

const getValidSlug = slug =>
  new Promise(resolve =>
    Page.findOne({
      where: { slug }
    })
    .then(page => {
      if(page) {
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
      const safePage = merge({
        userId: req.user.id,
        amount: req.body.amount || '',
        image: req.body.image || '',
        description: req.body.description || '',
        slug
      }, pick(['name', 'post_type', 'is_public'], req.body))
      return Page.create(safePage)
    })
    .then(page => res.status(200).json({page}))
    .catch(error => res.status(400).json({error}))
}
