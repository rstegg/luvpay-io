const { models } = require('../../../db')
const { Page } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = p => obj => Boolean(path([p], obj))

const validBody = pipe(
  path(['body', 'page']),
  allPass([
      validField('name'),
      validField('is_public')
  ]))

const getValidSlug = (slug, id) =>
  new Promise(resolve =>
    Page.findOne({
      where: { slug, id: {
          $ne: id
      }}
    })
    .then(page => {
      if(page) {
        return resolve(getValidSlug(Page, `${slug}-${shortId.generate().slice(0,1)}`))
      } else {
        return resolve(slug)
      }
    })
  )

const validate = (req) => {
  if (!validBody(req)) return Promise.reject('missing fields')

  const slug =
    req.body.page.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidSlug(slug, req.params.id)
}

module.exports = (req, res) => {
  validate(req)
    .then(slug => {
      const updatedPage = merge({
        slug
      }, pick(['name', 'page_type', 'is_public', 'topic', 'topic_other', 'image', 'description'], req.body.page))
      return Page.update(updatedPage, { where: { id: req.params.id, userId: req.user.id } })
    })
    .then(page => res.status(200).json({page}))
    .catch(error => res.status(400).json({error}))
}
