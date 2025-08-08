'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Themes',
      [
        { name: 'История'},
        { name: 'Наука'},
        { name: 'Искусство'},
        { name: 'Кино'},
        { name: 'Программирование'},
        { name: 'География'}
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Themes', null, {});
  }
};