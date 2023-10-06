'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('course', 'grade', Sequelize.STRING);
    await queryInterface.addColumn('course', 'level', Sequelize.STRING);
    await queryInterface.renameColumn('course', 'object', 'subject');
    await queryInterface.add;
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('course', 'grade');
    await queryInterface.removeColumn('course', 'level');
    await queryInterface.renameColumn('course', 'subject', 'object');
  },
};
