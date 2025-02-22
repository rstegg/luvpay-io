const { models } = require('../../../db')
const { Article } = models

const { mailgun } = require('../../service/mail')

const shortId = require('shortid')
const mailcomposer = require('mailcomposer')
const shareEmailTemplate = require('../../emails/share')

const { allPass, merge, path, pick, pipe } = require('ramda')

const validField = p => obj => Boolean(path([p], obj))

const validBody = pipe(
    path(['body']),
    allPass([
        validField('email'),
        validField('name'),
        validField('url'),
        validField('articleId')
    ]))

const validate = req => {
  if (!validBody(req)) return Promise.reject('missing fields')

  return Article.findOne({
      where: { id: req.body.articleId }
  })
  .then(article =>
      !article ?
          Promise.reject('invalid article') :
          article
  )
}

module.exports = (req, res) => {
  validate(req)
    .then(article => {
        const mail = mailcomposer({
          from: 'kuwau.com <hello@mg.kuwau.com>',
          to: req.body.email,
          subject: `${req.body.name}, your friend shared a link on kuwau.com!`,
          text: `${req.user.name} shared a link on kuwau.com! ${req.body.url}`,
          html: shareEmailTemplate(req.body.name, req.user.name, req.body.url, req.body.message)
        })
        mail.build((mailBuildError, message) => {
          const shareEmail = {
            to: req.body.email,
            message: message.toString('ascii')
          }
          mailgun.messages().sendMime(shareEmail, (sendError, body) => {
            if(sendError) {
              console.log(sendError);
              return;
            }
          })
        })
        res.status(200).json({sent: true})
      })
}
