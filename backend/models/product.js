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
      Product.belongsTo(models.Laboratory, {
        foreignKey: 'laboratoryId',
        as: 'laboratory'
      });
    }
  }

  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    laboratoryId: DataTypes.INTEGER // Asegúrate de que el campo sea categoryId
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
