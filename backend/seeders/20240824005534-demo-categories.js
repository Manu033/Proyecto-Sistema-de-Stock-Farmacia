'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Analgesicos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Antibióticos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Antiinflamatorios',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Antipiréticos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Antihistamínicos',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
