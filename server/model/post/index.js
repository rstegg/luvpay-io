module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kus', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open'
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    raised: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0'
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    feeType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'self'
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.belongsTo(sequelize.models['users'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    }
  })
}
