const Course = require('../../db/models/course');
const Chapter = require('../../db/models/chapter');
import { Request, Response, NextFunction } from 'express';

const fileUpload = require('../../config/firebase/fileUpload.js');
const { firebaseConfig } = require('../../config/firebase/firebase');
const admin = require('firebase-admin');
const {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} = require('firebase/storage');
const { initializeApp } = require('firebase/app');

initializeApp(firebaseConfig);
const storage = getStorage();

class CourseController {
  // [GET] /courses/:id
  getCourse(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    Course.findByPk(id)
      .then((course: any) => res.send(course))
      .catch(next);
  }

  // [GET] /courses
  getAllCourse(req: Request, res: Response, next: NextFunction) {
    Course.findAll()
      .then((course: any) => res.send(course))
      .catch(next);
  }

  // [GET] /courses/all
  getAllCourseFull(req: Request, res: Response, next: NextFunction) {
    Course.findByPk(req.params.id, { include: ['chapters'] })
      .then((course: any) => res.send(course))
      .catch(next);
  }

  // [POST] /courses/create
  async create(req: Request, res: Response, next: NextFunction) {
    let data = req.body;
    const file = req.file

    const dateTime = fileUpload.giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `thumbnails/${file?.originalname + '       ' + dateTime}`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: file?.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      file?.buffer,
      metadata
    );

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    data = { ...data, thumbnail: downloadURL };

    const course = Course.build(data);
    course
      .save()
      .then(() => res.send(course))
      .catch(next);
  }

  // [PUT] /courses/:id
  update(req: Request, res: Response, next: NextFunction) {
    Course.update(req.body.data, {
      where: {
        id: req.params.id,
      },
    })
      .then((course: any) => res.send(course))
      .catch(next);
  }

  // [DELETE] /courses/:id
  delete(req: Request, res: Response, next: NextFunction) {
    Course.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(res.send({}))
      .catch(next);
  }

}

module.exports = new CourseController();
