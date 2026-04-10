const express = require("express");
const router = express.Router();

const multer = require("multer");

const { evaluateAnswer, fullEvaluate } = require("../controllers/evaluationController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/evaluate", evaluateAnswer);

router.post(
  "/full-evaluate",
  upload.fields([
    { name: "studentFile", maxCount: 1 },
    { name: "teacherFile", maxCount: 1 }
  ]),
  fullEvaluate
);

module.exports = router;