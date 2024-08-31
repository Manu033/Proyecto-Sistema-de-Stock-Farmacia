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

      // Asociación con ProductType
      Product.belongsTo(models.ProductType, {
        foreignKey: 'productTypeId',
        as: 'productType',
      });

      Product.hasMany(models.Lot, {
        foreignKey: 'productId',
        as: 'lots',
      });

    }
  }

  Product.init({
    // productId: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true,
    // },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: DataTypes.STRING,
    productTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Product',
    timestameps: false,

  });

  return Product;
};
