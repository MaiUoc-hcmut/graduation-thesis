
const { sequelize } = require('../../config/db');
import { Model, DataTypes, CreationOptional } from 'sequelize';

class Exam_Question extends Model {
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Exam_Question.init(
  {
    id_exam: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },

    id_question: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
    tableName: 'exam_question',
    sequelize,
  },
);


module.exports = Exam_Question
