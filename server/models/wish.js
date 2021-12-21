'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Wish.init({
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Wish',
    freezeTableName: true
  });

  Wish.associate= (models) => {
    Wish.belongsTo(models.User, {
      foreignKey: "user_id",
      onDelete: "cascade"
    }),
    Wish.belongsTo(models.Post, {
      foreignKey: "post_id",
      onDelete: "cascade"
    })
  }

  return Wish;
};