const crypto = require('crypto')

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    interest_types: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ['open', 'research']
    },
    interests: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ['']
    },
    tech_wanted: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ['']
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    permalink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verify_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'individual'
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIP: true,
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$",'i'],
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    send_method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    receive_method: {
      type: DataTypes.STRING,
      allowNull: true
    },
    legal_entity: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    verify_needed: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate () {
        this.hasMany(sequelize.models['posts'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['pages'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
        this.hasMany(sequelize.models['articles'], { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
      }
    },
    instanceMethods: {
      validPassword(password) {
        const testhash = crypto.createHash('md5').update(password + this.salt).digest("hex");
        if(testhash === this.password) {
          return true;
        } else {
          return false;
        }
      }
    }
  })
}
