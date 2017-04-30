const { models } = require('../../../db')
const { User } = models

module.exports = (req, res) => {
    User
      .findOne({ where: { email: req.body.email } })
      .then(user => {
        //You can typically collapse an if / else if all it is doing is setting a flag.
        res.status(200).json({emailTaken: Boolean(user)})
      })
      //Because your query can fail you want to have a catch here for
      //handling it, otherwise you end up never sending the response
      .catch(err => res.status(500).json({error: err.message}))
}
