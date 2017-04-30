module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charges', {
    charge: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    freezeTableName: true
  })
}
