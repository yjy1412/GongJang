'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recomment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Recomment.init({
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
    comment_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Recomment',
  });

  Recomment.associate= (models) => {
    Recomment.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade"
    }),
    Recomment.belongsTo(models.Comment, {
      foreignKey: "comment_id",
      onDelete: "cascade"
    })
  }
  return Recomment;
};