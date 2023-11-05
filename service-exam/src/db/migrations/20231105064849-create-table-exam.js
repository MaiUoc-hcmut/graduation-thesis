'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exam', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      id_teacher: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      id_course: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      quantity_question: {
        type: Sequelize.BIGINT,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.createTable('question', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      id_teacher: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      id_course: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      solution: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_image: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
    await queryInterface.createTable('exam_question', {
      id_exam: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Exam',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      id_question: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Question',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('exam_question');
    await queryInterface.dropTable('exam');
    await queryInterface.dropTable('question');
  },
};
