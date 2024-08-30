'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Definir la asociación aquí
      Role.hasMany(models.Product, {
        foreignKey: 'roleId',
        as: 'users'
      });
    }
  }

  Role.init({
    name:{
         type: DataTypes.STRING,
         unique: true,
        allowNull: false
    },
    description: DataTypes.STRING,
  }, {
    sequelize,  
    modelName: 'Role',
  });

  return Role;
};
