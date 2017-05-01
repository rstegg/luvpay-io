module.exports = function(sequelize, DataTypes) {
  return {
    Article: require('./model/article')(sequelize, DataTypes),
    User: require('./model/user')(sequelize, DataTypes),
    Post: require('./model/post')(sequelize, DataTypes),
    Page: require('./model/page')(sequelize, DataTypes),
    Payment: require('./model/payment')(sequelize, DataTypes),
  }
}
