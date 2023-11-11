'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('course', {
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
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      last_update_time: Sequelize.DATE,
      start_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      object: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thumbnail: Sequelize.STRING,
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
    await queryInterface.createTable('chapter', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      id_course: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Course',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    await queryInterface.createTable('lecture', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      id_chapter: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      name: {
        type: Sequelize.STRING(100)
      },
      createdAt: {
        allowNull: false,
        references: {
          model: 'Chapter',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      id_video: {
        type: Sequelize.STRING(1000),
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      duration: {
        type: Sequelize.BIGINT,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lecture');
    await queryInterface.dropTable('chapter');
    await queryInterface.dropTable('course');
    // await queryInterface.dropTable('documents');
    // await queryInterface.dropTable('categories');
    // await queryInterface.dropTable('documentlecture');
    // await queryInterface.dropTable('documentcategory');
  },
};
