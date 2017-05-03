const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
})

const models = db.import(__dirname + '/models')

Object.keys(models)
  .map(name => models[name])
  .filter(model => model.associate)
  .forEach(model => model.associate(models))

db.sync()

module.exports = { db, models }
