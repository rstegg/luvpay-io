module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pages', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    link: {
      type: DataTypes.STRING,
      allowNull: true
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
    image: {
      type: DataTypes.STRING,
      allowNull: true
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
