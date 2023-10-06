const Lecture = require('../../db/models/lecture')
const Chapter = require('../../db/models/chapter')
import { Request, Response, NextFunction } from "express";
// import Queue from 'queue'
// const q = new Queue({ results: [] })

const fileUpload = require('../../config/firebase/fileUpload.js');
const { firebaseConfig } = require('../../config/firebase/firebase');
const {
    ref,
    getDownloadURL,
    uploadBytesResumable,
    getStorage,
} = require('firebase/storage');
const { initializeApp } = require('firebase/app');

initializeApp(firebaseConfig);
const storage = getStorage();

class LectureController {
    // [GET] courses/lectures/:id
    getLecture(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        Lecture.findByPk(id).then((lecture: any) =>
            res.send(lecture))
            .catch(next);
    }

    // [GET] /lectures
    getAllLecture(req: Request, res: Response, next: NextFunction) {
        Chapter.findByPk(req.body.data.id_chapter, { include: ["lectures"] }).then((chapter: any) =>
            res.send(chapter.lectures))
            .catch(next);
    }

    // [POST] /lectures/create
    async create(req: Request, res: Response, next: NextFunction) {
        let data = req.body;
        const file = req.file
        console.log(file);

        // q.push(() => {
        //     return new Promise((resolve, reject) => {
        //         // Upload the file in the bucket storage
        //         const snapshot = uploadBytesResumable(
        //             storageRef,
        //             file?.buffer,
        //             metadata
        //         );
        //         resolve(snapshot)
        //     })
        // })

        const dateTime = fileUpload.giveCurrentDateTime();

        const storageRef = ref(
            storage,
            `video-courses/${file?.originalname + '       ' + dateTime}`
        );

        // Create file metadata including the content type
        const metadata = {
            contentType: file?.mimetype,
        };

        const snapshot = uploadBytesResumable(
            storageRef,
            file?.buffer,
            metadata
        );

        console.log(snapshot);

        // // Grab the public url
        // const downloadURL = await getDownloadURL(snapshot.ref);

        // data = { ...data, id_video: downloadURL };

        // const lecture = Lecture.build(data);
        // lecture
        //     .save()
        //     .then((lecture: any) => {
        //         res.send(lecture)
        //     })
        //     .catch(next);
    }

    // [PUT] /lectures/:id
    update(req: Request, res: Response, next: NextFunction) {
        Lecture.update(req.body.data, {
            where: {
                id: req.params.id
            }
        })
            .then((lecture: any) =>
                res.send(lecture))
            .catch(next);
    }

    // [DELETE] /lectures/:id
    delete(req: Request, res: Response, next: NextFunction) {
        Lecture.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(res.send({}))
            .catch((err: Error) => { throw err });
    }

}

module.exports = new LectureController();
