'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Post.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    category: DataTypes.STRING,
    state: DataTypes.STRING,
    image1: DataTypes.STRING,
    image2: DataTypes.STRING,
    image3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};