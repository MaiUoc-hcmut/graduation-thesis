const { sequelize } = require('../../config/db');
import { Model, DataTypes, CreationOptional } from 'sequelize';
const Question = require('./question');

class Answer extends Model {
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Answer.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        content_text: {
            type: DataTypes.STRING,
        },
        content_image: {
            type: DataTypes.STRING,
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
        sequelize,
        modelName: 'Answer',
    }
);

Answer.belongsToMany(Question, {
    through: 'QuestionAnswer',
    foreignKey: 'id_answer',
    otherKey: 'id_question'
})

module.exports = Answer;