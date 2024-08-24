'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'password123', // En un entorno real, asegúrate de encriptar la contraseña
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { email: 'demo@example.com' }, {});
  }
};
