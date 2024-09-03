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

      Lot.hasMany(models.MovementDetail, {
        foreignKey: 'lotId',
        as: 'movementDetails'
      });
    }
  }

  Lot.init({
    lotCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    laboratoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
     },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'Lot',
    indexes: [
      {
        unique: true,
        fields: ['lotCode', 'productId', 'laboratoryId'],
      },
    ],
    timestameps: false,
  });

  return Lot;
};
