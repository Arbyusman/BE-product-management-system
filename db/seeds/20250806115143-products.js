'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'lorem',
        price: 99.99,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'ipsum',
        price: 199.99,
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem',
        stock: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};
