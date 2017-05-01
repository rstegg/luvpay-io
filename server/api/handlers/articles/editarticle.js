const { models } = require('../../../db')
const { Article } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = p => obj => Boolean(path([p], obj))

const validBody = pipe(
    path(['body']),
    allPass([
        validField('name'),
        validField('post_type'),
        validField('is_public')
    ]))

const getValidSlug = (slug, id) =>
  new Promise(resolve =>
    Article.findOne({
      where: { slug, id: {
          $ne: id
      }}
    })
    .then(article => {
      if(article) {
        return resolve(getValidSlug(Article, `${slug}-${shortId.generate().slice(0,1)}`))
      } else {
        return resolve(slug)
      }
    })
  )

const validate = (req) => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const slug =
    req.body.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidSlug(slug, req.params.id)
}

module.exports = (req, res) => {
  validate(req)
    .then(slug => {
      const safeArticle = merge({
        amount: req.body.amount || '',
        image: req.body.image || '',
        description: req.body.description || '',
        slug
      }, pick(['name', 'post_type', 'is_public'], req.body))
      return Article.update(safeArticle, { where: { id: req.params.id, userId: req.user.id } })
    })
    .then(article => res.status(200).json({article}))
    .catch(error => res.status(400).json({error}))
}
