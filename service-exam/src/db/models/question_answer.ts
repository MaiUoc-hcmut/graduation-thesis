const { sequelize } = require('../../config/db');
import { Model, DataTypes, CreationOptional } from 'sequelize';

class QuestionAnswer extends Model {}

QuestionAnswer.init(
    {
        id_question: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'Questions',
                key: 'id'
            }
        },
        id_answer: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'Answers',
                key: 'id'
            }
        },
        is_true: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    }, 
    {
        sequelize,
        modelName: 'QuestionAnswer',
    }
);

module.exports = QuestionAnswer;