'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación aquí
      Batch.belongsTo(models.Product, {
        foreignKey: 'cod_product',
        as: 'product',
      });

      // Definir la asociación con Laboratory
      Batch.belongsTo(models.Product, {
        foreignKey: 'cod_laboratory',
        as: 'laboratory',
      });
    }
  }

  Batch.init({
    cod_batch: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    //autoIncrement: true
    },
    cod_product: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'Product', // Nombre de la tabla en la base de datos
        key: 'cod_product'
      }
    },
    cod_laboratory: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      references: {
        model: 'Product', // Nombre de la tabla en la base de datos
        key: 'cod_laboratory'
      }
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false
    }

    //Ver si agregamos cantidades, ya sea cantidad_actual o cantidad_inicial
},
  {
    sequelize,
    modelName: 'Batch',
    primaryKey: ['cod_batch', 'cod_product', 'cod_laboratory'],
  });

  return Batch;
};
