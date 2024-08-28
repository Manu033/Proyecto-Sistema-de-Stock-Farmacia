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
        // Relación muchos a muchos con Permission
        Role.belongsToMany(models.Permission, {
          through: 'Role_Permission', // Nombre de la tabla intermedia
          foreignKey: 'cod_role',
          otherKey: 'cod_permission',
          as: 'permissions' // Alias para acceder a los permisos relacionados
        });
      } 
  }

  Role.init({
    cod_role: {
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
    modelName: 'Role',
  });


  return Role;
};
