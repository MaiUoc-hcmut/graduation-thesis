const Question = require('../../db/models/question');
const Exam_Question = require('../../db/models/exam_question');
import { Request, Response, NextFunction } from 'express';
const axios = require('axios');

class QuestionController {
    // [GET] /api/v1/question/:questionId
    getQuestionById = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { questionId } = req.params;

            const question = await Question.findByPk(questionId);

            if (!question) return res.status(404).json({ message: "Question not found!" });

            res.status(200).json(question);
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // [GET] /api/v1/question/teacher
    getQuestionCreatedByTeacher = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const id_teacher = req.teacher.data.id;

            const questions = await Question.findAll({
                where: { id_teacher }
            });

            return res.status(200).json(questions);
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }   
    }

    // [GET] /api/v1/question/exam/:examId
    getQuestionsOfExam = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { examId } = req.params;

            const questionIds = await Exam_Question.findAll({
                where: { id_exam: examId },
                attributes: ['id_question']
            });

            let questions: any[] = [];

            questionIds.map(async (id_question: number) => {
                const question = await Question.findByPk(id_question);
                questions.push(question);
            })

            res.status(200).json({ data: questions });

        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // [POST] /api/v1/question/create
    createQuestion = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const id_teacher = req.teacher.data.id;

            const { examId, categories, ...body} = req.body;
            body.id_teacher = id_teacher;

            const newQuestion = await Question.create({ ...body });

            if (examId) {
                await Exam_Question.create({
                    id_exam: examId,
                    id_question: newQuestion.id
                });
            }

            res.status(201).json(newQuestion);
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    
    // [PUT] /api/v1/question/update
    updateQuestion = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { questionId } = req.params;
            const id_teacher = req.teacher.data.id;

            const question = await Question.findByPk(questionId);

            if (!question) return res.status(404).json({ message: "Question not found!" });
            if (id_teacher != question.id_teacher) 
                return res.status(401).json({ message: "You do not have permission to do this action!" });

            question.update(req.body);

            return res.status(200).json(question);

        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }


    deleteQuestion = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const id_teacher = req.teacher.data.id;
            const { questionId } = req.params;

            const question = await Question.findByPk(questionId);

            if (!question) return res.status(404).json({ message: "Question not found!" });

            if (id_teacher != question.id_teacher)
                return res.status(401).json({ message: "You do not have permission to do this action!" });

            await question.destroy();

            res.status(200).json({
                message: "Question has been deleted",
                questionId
            })
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = new QuestionController();
