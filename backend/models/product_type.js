'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        // Definir la asociación aquí
        Product_type.hasMany(models.Product, {
          foreignKey: 'cod_product_type', // Este es el nombre de la clave foránea que se agregará a la tabla 'Products'
          as: 'products'
        });
      };      
  }

  Product_type.init({
    cod_product_type: {
      type: DataTypes.TINYINT,
      primaryKey: true,
      allowNull: false,
    //autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
  },
    description: {
      type: DataTypes.STRING,
      allowNull: false
  },
},
  {
    sequelize,
    modelName: 'Product_type',
  });


  return Product_type;
};
