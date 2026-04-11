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

router.put("/override/:id", async (req, res) => {
  try {
    const { score, feedback } = req.body;

    const updated = await Evaluation.findByIdAndUpdate(
      req.params.id,
      {
        finalScore: score,
        finalFeedback: feedback,
        isModified: true
      },
      { new: true }
    );

    res.json({
      message: "Evaluation overridden",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error: "Override failed" });
  }
});

module.exports = router;