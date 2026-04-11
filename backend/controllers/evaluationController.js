const { chatSession } = require("../script/index");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const Evaluations = require("../models/Evaluations");
const { extractTextFromOCR } = require("../utils/ocr");

async function summarizeText(model, text) {
  const prompt = `
Summarize the following text in a concise way for evaluation.
Focus on key concepts, important points, and meaning.

Text:
${text}
`;

  const response = await chatSession.sendMessage(prompt);
  return response.response.text();
}

const evaluateAnswer = async (req, res) => {
  try {
    const { studentAnswer, teacherAnswer } = req.body;

    if (!studentAnswer || !teacherAnswer) {
      return res.status(400).json({
        error: "Both studentAnswer and teacherAnswer are required",
      });
    }

    const prompt = `
You are an AI teacher.

Compare the student's answer with the teacher's answer.

Teacher Answer:
${teacherAnswer}

Student Answer:
${studentAnswer}

IMPORTANT:
- If the student's answer matches the teacher's answer, it should be considered correct.
- Give high score (18-20) for correct answers even if similar.
- "similarity" = how correct the answer is compared to teacher.
- "plagiarism" = only measure if the student copied wording directly (but do NOT reduce score because of it).
- Score should reflect correctness, not copying.

Return ONLY valid JSON (no explanation, no markdown):

{
  "score": number (out of 20),
  "feedback": "short feedback",
  "similarity": number (0-100),
  "plagiarism": number (0-100)
}
`;

    const response = await chatSession.sendMessage(prompt);

    let result = response.response.text();

    console.log("RAW AI:", result); // 🔥 debug

    result = result.replace(/```json|```/g, "");

    try {
      result = JSON.parse(result);
    } catch (err) {
      return res.json({
        message: "Evaluation complete (raw)",
        result
      });
    }

    res.json({
      message: "Evaluation complete",
      result,
    });

  } catch (error) {
    console.error("Evaluation Error:", error);
    res.status(500).json({
      error: "Evaluation failed",
    });
  }
};

const extractText = async (filePath) => {
  try {
    // Step 1: Try normal extraction
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);

    if (data.text && data.text.trim().length > 50) {
      console.log("✅ Using pdf-parse");
      return data.text;
    }

    // Step 2: fallback to OCR
    console.log("🟡 Using OCR...");
    return await extractTextFromOCR(filePath);

  } catch (err) {
    console.error("Extraction Error:", err);
    return "";
  }
};

const fullEvaluate = async (req, res) => {
  try {
    const studentPath = req.files.studentFile[0].path;
    const teacherPath = req.files.teacherFile[0].path;

    const studentText = await extractText(studentPath);
    const teacherText = await extractText(teacherPath);

    const safeStudentText = studentText.slice(0, 8000);
    const safeTeacherText = teacherText.slice(0, 8000);

    // SUMMARIZE
    const studentSummary = await summarizeText(chatSession, safeStudentText);
    const teacherSummary = await summarizeText(chatSession, safeTeacherText);

    console.log("Student Text:", studentText.slice(0, 100));
    console.log("Teacher Text:", teacherText.slice(0, 100));

    const prompt = `
You are an AI teacher.

Compare the student's answer with the teacher's answer.

Teacher Answer:
${teacherSummary}

Student Answer:
${studentSummary}

IMPORTANT: 
- If the student's answer matches the teacher's answer, it should be considered correct.
- Give high score (18-20) for correct answers even if similar.
- "similarity" = how correct the answer is compared to teacher.
- "plagiarism" = only measure if the student copied wording directly (but do NOT reduce score because of it).
- Score should reflect correctness, not copying.

Return ONLY valid JSON (no explanation, no markdown):

{
  "score": number (out of 20),
  "feedback": "short feedback",
  "similarity": number (0-100),
  "plagiarism": number (0-100)
}
`;

    const response = await chatSession.sendMessage(prompt);

    let result = response.response.text();

    console.log("RAW AI FULL:", result); // 🔥 debug

    result = result.replace(/```json|```/g, "");

    try {
      result = JSON.parse(result);
    } catch (err) {
      return res.json({
        message: "Full evaluation (raw)",
        result
      });
    }

    // SAVE TO DB
    const saved = await Evaluations.create({
      studentText,
      teacherText,

      aiScore: result.score,
      aiFeedback: result.feedback,
      similarity: result.similarity,
      plagiarism: result.plagiarism
    });

    res.json({
      message: "Full evaluation complete",
      result,
      id: saved._id
    });

  } catch (error) {
    console.error("Full Eval Error:", error);
    res.status(500).json({
      error: "Full evaluation failed",
    });
  }
};

module.exports = {
  evaluateAnswer,
  fullEvaluate
};