'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación aquí
        Movement.belongsTo(models.Service, {
            foreignKey: 'serviceId',
            as: 'service'
        });
        Movement.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
        Movement.belongsTo(models.MovementType, {
            foreignKey: 'movementTypeId',
            as: 'movementType'
        });

        Movement.hasMany(models.MovementDetail, {
          foreignKey: 'movementId',
          as: 'movementDetails'
        });
    }
  }

  Movement.init({
    movementDate: {
        type: DataTypes.DATE,
        allowNull: false
        },
    description: DataTypes.STRING,
    movementTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,  
    modelName: 'Movement',
    timestameps: false,

  });

  return Movement;
};
