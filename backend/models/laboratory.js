'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Laboratory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación aquí
      Laboratory.hasMany(models.Lot, {
        foreignKey: 'laboratoryId',
        as: 'lots'
      });
    }
  }

  Laboratory.init({
    name:{
         type: DataTypes.STRING,
         unique: true,
        allowNull: false
    },
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Laboratory',
    timestameps: false,

  });

  return Laboratory;
};
