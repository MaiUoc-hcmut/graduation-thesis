const Exam = require("../../db/models/exam");
const Exam_Question = require('../../db/models/exam_question');
import axios from "axios";
import { Request, Response, NextFunction } from "express";

class ExamController {
    getExamById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
        
            const exam = await Exam.findByPk(id);
            if (!exam) return res.status(404).json({ message: "Exam not found!" });

            res.status(200).json(exam);
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    getExamsCreatedByTeacher = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id_teacher = req.teacher.data.id;

            const exams = await Exam.findAll({
                where: { id_teacher }
            });

            res.status(exams);
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // [GET] /api/v1/exam/question/:questionId
    getExamsContainQuestion = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { questionId } = req.params;

            const examIds = await Exam_Question.findAll({
                where: { id_question: questionId },
                attributes: ['id_exam']
            });

            let exams: any[] = [];

            examIds.map(async (id: number) => {
                const exam = await Exam.findByPk(id);
                exams.push(exam);
            })

            res.status(200).json({ data: exams });
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // [POST] /api/v1/exam/create
    createExam = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const id_teacher = req.teacher.data.id;
            
            const { courseId, categories, ...body} = req.body;

            body.id_teacher = id_teacher;

            const newExam = await Exam.create({ ...body });

            if (courseId) {
                await axios.post(
                    'http://localhost:3001/api/v1/course/insert/jointable/course-exam',
                    {
                        id_course: courseId,
                        id_exam: newExam.id
                    }
                )
            }

            res.status(201).json(newExam);

        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    deleteExam = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { examId } = req.params;
            const id_teacher = req.teacher.data.id;

            const exam = await Exam.findByPk(examId);

            if (!exam) return res.status(404).json({ message: "Exam not found!" });

            if (id_teacher != exam.id_teacher) 
                return res.status(401).json({ message: "You do not have permission to do this action!" });

            await exam.destroy();

            res.status(200).json({
                message: "Exam has been deleted",
                examId
            });

        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ExamController();
