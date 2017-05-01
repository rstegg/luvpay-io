const { models } = require('../../../db')
const { Post } = models

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
    Post.findOne({
      where: { slug, id: {
          $ne: id
      }}
    })
    .then(post => {
      if(post) {
        return resolve(getValidSlug(Post, `${slug}-${shortId.generate().slice(0,1)}`))
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
      const safePost = merge({
        slug
      }, pick(['name', 'post_type', 'is_public', 'research_type', 'research_other', 'image', 'description'], req.body))
      return Post.update(safePost, { where: { id: req.params.id, userId: req.user.id } })
    })
    .then(post => res.status(200).json({post}))
    .catch(error => res.status(400).json({error}))
}
