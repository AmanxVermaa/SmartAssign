const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
    studentText: String,
    teacherText: String,

    aiScore: Number,
    aiFeedback: String,
    similarity: Number,
    plagiarism: Number,

    finalScore: Number,
    finalFeedback: String,
    isUpdated: {
        type: Boolean,
        default: false
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    }
}, {timestamps: true});

module.exports = mongoose.model("Evaluations", evaluationSchema);