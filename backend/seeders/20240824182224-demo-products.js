'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Ibuprofeno 400mg',
        categoryId: 6, // ID de la categoría "Analgesicos"
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Amoxicilina 500mg',
        categoryId: 7, // ID de la categoría "Antibióticos"
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Paracetamol 500mg',
        categoryId: 9, // ID de la categoría "Antipiréticos"
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Loratadina 10mg',
        categoryId: 10, // ID de la categoría "Antihistamínicos"
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Diclofenac 50mg',
        categoryId: 8, // ID de la categoría "Antiinflamatorios"
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
