'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación aquí
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    }
  }

  Product.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER // Asegúrate de que el campo sea categoryId
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
