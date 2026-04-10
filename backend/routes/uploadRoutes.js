const express = require("express");
const router = express.Router();
const multer = require("multer");

const { processAssignment } = require("../controllers/pdfController");
const { testGeminiAPI } = require("../controllers/testController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    },
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Only PDF files are allowed"), false);
        }
    }
});

router.post("/upload", upload.single("assignment"), processAssignment );
router.get("/test-gemini", testGeminiAPI);

module.exports = router;