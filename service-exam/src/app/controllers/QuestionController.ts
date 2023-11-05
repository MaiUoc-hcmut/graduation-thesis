const Question = require('../../db/models/question');
import { Request, Response, NextFunction } from 'express';

class QuestionController {
  getQuestion(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    Question.findByPk(id)
      .then((question: any) => res.send(question))
      .catch(next);
  }

  getAllQuestion(req: Request, res: Response, next: NextFunction) {
    if (req.query.id_teacher) {
      Question.findAll({
        where: {
          id_teacher: req.query.id_teacher
        }
      })
        .then((question: any) => res.send(question))
        .catch(next);
    }
    else {
      Question.findAll()
        .then((question: any) => res.send(question))
        .catch(next);
    }
  }

  getAllQuestionFull(req: Request, res: Response, next: NextFunction) {
    Question.findByPk(req.params.id, { include: ['chapters'] })
      .then((question: any) => res.send(question))
      .catch(next);
  }


  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const question = Question.build(data);
    question
      .save()
      .then((question: any) => {
        res.send(question)
      })
      .catch(next);

  }

  update(req: Request, res: Response, next: NextFunction) {
    Question.update(req.body.data, {
      where: {
        id: req.params.id,
      },
    })
      .then((question: any) => res.send(question))
      .catch(next);
  }


  delete(req: Request, res: Response, next: NextFunction) {
    Question.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(res.send({}))
      .catch(next);
  }

}

module.exports = new QuestionController();
