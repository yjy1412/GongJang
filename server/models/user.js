'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    profile_image: {
      type: DataTypes.STRING,
      defaultValue: __dirname + '/../source/profileImg.jpg'
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "user_id"
    }),
      User.hasMany(models.Comment, {
        foreignKey: "user_id"
      }),
      User.hasMany(models.Wish, {
        foreignKey: "user_id"
      })
  }
  return User;
};