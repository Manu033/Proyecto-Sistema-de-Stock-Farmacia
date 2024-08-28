'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Laboratory extends Model {

    static associate(models) {
        // Definir la asociación aquí
        Laboratory.hasMany(models.Product, {
          foreignKey: 'cod_laboratory', // Este es el nombre de la clave foránea que se agregará a la tabla 'Products'
          as: 'products'
        });// Esto permite, por ejemplo, consultar todos los productos asociados con un laboratorio específico.
      }; 
  }

  Laboratory.init({
    cod_laboratory: {
        type: DataTypes.SMALLINT,
        allowNull: false, // Además, evita que sea NULL si es clave primaria
    //  autoIncrement: true // Opcional: si deseas que sea un valor auto-incremental
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
    modelName: 'Laboratory',
    primaryKey: 'cod_laboratory',
  });

  return Laboratory;
};
