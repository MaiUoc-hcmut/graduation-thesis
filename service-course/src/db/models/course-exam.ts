const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db');

class CourseExam extends Model {}

CourseExam.init({
    id_exam: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    id_course: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, {
    sequelize,
    modelName: 'ExamCourse',
    tableName: 'exam_course'
});

module.exports = CourseExam;
