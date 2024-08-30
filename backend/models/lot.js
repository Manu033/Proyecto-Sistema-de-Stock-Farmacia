'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación aquí
      Lot.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
      });

      Lot.belongsTo(models.Laboratory, {
        foreignKey: 'laboratoryId',
        as: 'laboratory',
      });
    }
  }

  Lot.init({
    lotId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    laboratoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
     },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Lot',
  });

  return Lot;
};
