'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovementDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación aquí
      MovementDetail.belongsTo(models.Movement, {
        foreignKey: 'movementId',
        as: 'movement',
      });

      MovementDetail.belongsTo(models.Lot, {
        foreignKey: 'lotId',
        as: 'lot',
      });


    }
  }

  MovementDetail.init({
    movementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    laboratoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'MovementDetail',
    indexes: [
      {
        unique: true,
        fields: ['movementId', 'lotId', 'laboratoryId', 'productId'],
      },
    ],
    timestameps: false,

  });

  return MovementDetail;
};
