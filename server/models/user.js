'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.News, {
        foreignKey: 'userId',
      })
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'FullName is required'
        },
        notEmpty: {
          msg: 'FullName cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
          args: true,
          msg: 'Email must be unique'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email format'
        },
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeValidate: ( async (user, options) => {
        if (user.password) {
          user.password = bcrypt.hashSync(user.password, salt);
        }
      })
    }
  });
  return User;
};