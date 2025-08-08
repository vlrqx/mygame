'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Alex',
          email: 'alex@the.devastator',
          hashpass: await bcrypt.hash('123456', 10),
        }
      ],
      {},
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
