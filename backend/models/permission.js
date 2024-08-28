'use strict';
const { Model, BelongsToMany } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
        // Relación muchos a muchos con Role
        Permission.belongsToMany(models.Role, {
          through: 'Role_Permission', // Nombre de la tabla intermedia
          foreignKey: 'cod_permission',
          otherKey: 'cod_role',
          as: 'roles' // Alias para acceder a los roles relacionados
        });
      }

  }

  Permission.init({
    cod_permision: {
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
    modelName: 'Permission',
  });


  return Permission;
};
