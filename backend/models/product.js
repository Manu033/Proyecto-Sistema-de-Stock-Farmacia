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

      //Relacion con Laboratory
      Product.belongsTo(models.Laboratory, {
        foreignKey: 'cod_laboratory',
        as: 'laboratory',
      });

      //Relacion con Product_type
      Product.belongsTo(models.Product_type, {
        foreignKey: 'cod_product_type',
        as: 'product_type',
      });

      // Relación con Batch
      Product.hasMany(models.Batch, {
        foreignKey: 'cod_product',
        as: 'batches',
      });
    }      
  }

  Product.init({
    cod_product: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    //autoIncrement: true
    },
    cod_laboratory: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'Laboratory', // Nombre de la tabla en la base de datos
        key: 'cod_laboratory'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
  },
    description: {
      type: DataTypes.STRING,
      allowNull: false
  },
  cod_product_type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    references: {
      model: 'Product_type',
      key: 'cod_product_type'
    }
  },
},
  {
    sequelize,
    modelName: 'Product',
    primaryKey: ['cod_product', 'cod_laboratory'],
  });

  return Product;
};
