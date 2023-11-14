'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course_exam', {
      id_exam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_course: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('course_exam');
  }
};
