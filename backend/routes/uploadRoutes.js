const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
})

const upload = multer({storage});

router.post("/upload", upload.single("assignment"), (req, res) => {
    res.json({
        message: "Assignment uploaded successfully",
        file: req.file,
    });
});

module.exports = router;