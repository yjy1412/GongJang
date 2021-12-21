'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comment.init({
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    ref_comment: {
      type : DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });

  Comment.associate= (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade"
    }),
    Comment.belongsTo(models.Post, {
      foreignKey: "post_id",
      onDelete: "cascade"
    })
  }

  return Comment;
};