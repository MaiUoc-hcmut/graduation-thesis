
const { sequelize } = require('../../config/db');
import { Model, DataTypes, CreationOptional } from 'sequelize';

class Question extends Model {
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id_teacher: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    id_course: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    solution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_image: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'question',
    sequelize,
  },
);


module.exports = Question
