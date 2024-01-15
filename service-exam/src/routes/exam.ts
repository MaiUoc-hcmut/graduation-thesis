const express = require('express');
const router = express.Router();
const examController = require("../app/controllers/ExamController");

//route exam
router.put("/:id", examController.update);
router.delete("/:id", examController.delete);
router.post("/", examController.create);
router.get("/:id", examController.getExam);
router.get("/", examController.getAllExam);




module.exports = router;
