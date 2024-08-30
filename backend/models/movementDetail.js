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

    //   MovementDetail.belongsTo(models.Lot, {
    //     foreignKey: 'laboratoryId',
    //     targetKey: 'laboratoryId',
    //     as: 'laboratory',
    //   });

    //   MovementDetail.belongsTo(models.Lot, {
    //     foreignKey: 'productId',
    //     targetKey: 'productId',
    //     as: 'product',
    //   });
    }
  }

  MovementDetail.init({
    movementId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    lotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    laboratoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'MovementDetail',
  });

  return MovementDetail;
};
