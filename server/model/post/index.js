module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    post_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'open'
    },
    research_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    research_other: {
      type: DataTypes.STRING,
      allowNull: true
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
