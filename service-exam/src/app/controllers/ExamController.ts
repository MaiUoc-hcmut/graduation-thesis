const Exam = require('../../db/models/exam');
import { Request, Response, NextFunction } from 'express';

class ExamController {
  getExam(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    Exam.findByPk(id)
      .then((exam: any) => res.send(exam))
      .catch(next);
  }

  getAllExam(req: Request, res: Response, next: NextFunction) {
    if (req.query.id_teacher) {
      Exam.findAll({
        where: {
          id_teacher: req.query.id_teacher
        }
      })
        .then((exam: any) => res.send(exam))
        .catch(next);
    }
    else {
      Exam.findAll()
        .then((exam: any) => res.send(exam))
        .catch(next);
    }
  }

  getAllExamFull(req: Request, res: Response, next: NextFunction) {
    Exam.findByPk(req.params.id, { include: ['chapters'] })
      .then((exam: any) => res.send(exam))
      .catch(next);
  }


  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body
    const exam = Exam.build(data);

    console.log(exam);

    exam
      .save()
      .then((exam: any) => {
        res.send(exam)
      })
      .catch(next);

  }

  update(req: Request, res: Response, next: NextFunction) {
    Exam.update(req.body.data, {
      where: {
        id: req.params.id,
      },
    })
      .then((exam: any) => res.send(exam))
      .catch(next);
  }


  delete(req: Request, res: Response, next: NextFunction) {
    Exam.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(res.send({}))
      .catch(next);
  }

}

module.exports = new ExamController();
