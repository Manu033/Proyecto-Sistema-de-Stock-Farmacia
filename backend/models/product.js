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
        as: 'laboratory',
      });

      Product.belongsTo(models.ProductType, {
        foreignKey: 'productTypeId',
        as: 'productType',
      });

    }
  }

  Product.init({
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    laboratoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    productTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
