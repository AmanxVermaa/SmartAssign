const express = require("express");
const router = express.Router();
const multer = require("multer");

const auth = require("../middleware/auth");
const Evaluations = require("../models/Evaluations");
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
  auth,
  upload.fields([
    { name: "studentFile", maxCount: 1 },
    { name: "teacherFile", maxCount: 1 }
  ]),
  fullEvaluate
);

router.put("/override/:id", auth, async (req, res) => {
  try {
    const { score, feedback } = req.body;

    const updated = await Evaluations.findOneAndUpdate(
      {
        _id: req.params.id,
        teacherId: req.user.id
      },
      {
        finalScore: score,
        finalFeedback: feedback,
        isUpdated: true
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

router.get("/evaluations", auth, async (req, res) => {
  try {
    const data = await Evaluations.find({
      teacherId: req.user.id
    }).sort({ createdAt: -1 });

    res.json({
      count: data.length,
      data
    });

  } catch (error) {
    console.error("GET ALL ERROR:", error);
    res.status(500).json({ error: "Failed to fetch evaluations" });
  }
});

router.get("/evaluations/filter", auth, async (req, res) => {
  try {
    const { minScore } = req.query;

    const data = await Evaluations.find({
      teacherId: req.user.id,
      ...(minScore && {finalScore: { $gte: Number(minScore) } })
    });

    res.json({
      count: data.length,
      data
    });

  } catch (error) {
    console.error("FILTER ERROR:", error);
    res.status(500).json({ error: "Filter failed" });
  }
});

router.get("/evaluations/:id", auth, async (req, res) => {
  try {
    const data = await Evaluations.findOne({
      _id: req.params.id,
      teacherId: req.user.id
    });

    if (!data) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json(data);

  } catch (error) {
    console.error("GET ONE ERROR:", error);
    res.status(500).json({ error: "Failed to fetch evaluation" });
  }
});

router.delete("/evaluations/:id", auth, async (req, res) => {
  try {
    const deleted = await Evaluations.findOneAndDelete({
      _id: req.params.id,
      teacherId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({
        error: "Not found or unauthorized"
      });
    }

    res.json({
      message: "Deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;