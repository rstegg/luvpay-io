const { models } = require('../../../db')
const { Post } = models

const shortId = require('shortid')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = p => obj => Boolean(path([p], obj))

const validBody = pipe(
    path(['body', 'post']),
    allPass([
        validField('name'),
        validField('post_type')
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
    req.body.post.name
      .replace("'", '')
      .replace(/[^a-z0-9]/gi, '-')
      .toLowerCase()
      .trim()

  return getValidSlug(slug)
}

module.exports = (req, res) => {
  validate(req)
    .then(slug => {
      const newPost = merge({
        userId: req.user.id,
        slug
      }, pick(['name', 'post_type', 'is_public', 'topic', 'topic_other', 'image', 'description'], req.body.post))
      return Post.create(newPost)
    })
    .then(post => res.status(200).json({post}))
    .catch(error => res.status(400).json({error})) //TODO: return custom error handling
}
