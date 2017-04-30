const { models } = require('../../db')
const { User } = models

const passport = require('passport')

const router = require('express').Router()

const crypto = require('crypto')
const mailcomposer = require('mailcomposer')

module.exports = () => {
  router.post(`/card`, passport.authenticate('jwt', { session: false }), (req, res) => {
    User
      .findOne({ where: { id: req.user.id } })
      .then(user => {
        if(user) {
          const updated_card_accounts = user.card_accounts.concat(req.body.card)
          User
            .update({ card_accounts: updated_card_accounts }, { where: { id: req.user.id } })
              .then(updatedUser => {
                res.status(200).json({user: updatedUser})
              })
              .catch(err => {
                console.log(err)
              })
        } else {
          res.status(400).json({error: 'No user'})
        }
      })
      .catch(error => {
        res.status(400).json({error: 'Invalid request'})
      })
  })

  router.post(`/bank`, passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body);
    User
      .findOne({ where: { id: req.user.id } })
      .then(user => {
        if(user) {
          const updated_bank_accounts = user.bank_accounts.concat(req.body.bank)
          User
            .update({ bank_accounts: updated_bank_accounts }, { where: { id: req.user.id } })
              .then(updatedUser => {
                res.status(200).json({user: updatedUser})
              })
              .catch(err => {
                console.log(err);
              })
        } else {
          res.status(400).json({error: 'No user'})
        }
      })
      .catch(error => {
        console.log(error)
        res.status(400).json({error: 'Invalid request'})
      })
  })

  return router
}
