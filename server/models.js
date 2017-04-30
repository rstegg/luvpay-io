module.exports = function(sequelize, DataTypes) {
  return {
    User: require('./model/user')(sequelize, DataTypes),
    Post: require('./model/post')(sequelize, DataTypes),
    Payment: require('./model/payment')(sequelize, DataTypes),
    Charge: require('./model/charge')(sequelize, DataTypes)
  }
}
