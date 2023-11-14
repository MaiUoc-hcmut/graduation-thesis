const Answer = require('../../db/models/answer');
const QuestionAnswer = require('../../db/models/question_answer');
import { Request, Response, NextFunction } from "express";

class AnswerController {

    // [GET] /api/v1/answer/question/:questionId
    getAnswerBelongToQuestion = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { questionId } = req.params;

            const answerIds = await QuestionAnswer.findAll({
                where: { id_question: questionId },
                attributes: ['id_answer']
            });

            let answers: any[] = [];

            answerIds.map(async (id: number) => {
                const answer = await Answer.findByPk(id);
                answers.push(answer);
            })

            res.status(200).json({ data: answers });
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // [POST] /api/v1/answer/create
    createAnswer = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const {id_question, is_true, ...body} = req.body;

            const newAnswer = await Answer.create({ ...body });

            const newRec = await QuestionAnswer.create({
                id_question,
                id_answer: newAnswer.id,
                is_true
            })

            res.status(201).json({
                newAnswer,
                newRec
            });
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // [PUT] /api/v1/answer/update/:answerId
    updateAnswer = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { answerId } = req.params;
            const answer = Answer.findByPk(answerId);

            if (!answer) return res.status(404).json({ message: "Exam not found!" });

            await answer.update(req.body);

            res.status(200).json(answer);
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }

    // [DELETE] /api/v1/answer/delete/:answerId
    deleteAnswer = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { answerId } = req.params;
            const answer = Answer.findByPk(answerId);

            if (!answer) return res.status(404).json({ message: "Exam not found!" });

            await answer.destroy();

            res.status(200).json({
                id: answerId
            })
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AnswerController();