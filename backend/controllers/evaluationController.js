const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");

const { chatSession } = require("../script/index");

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

    // 🔥 FIX: remove markdown if present
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


const extractText = async (filePath, isHandwritten) => {
  try {
    if (!isHandwritten) {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      return data.text;
    } else {
      const { data } = await Tesseract.recognize(filePath, "eng");
      return data.text;
    }
  } catch (err) {
    console.error("Extraction Error:", err);
    return "";
  }
};


const fullEvaluate = async (req, res) => {
  try {
    const studentPath = req.files.studentFile[0].path;
    const teacherPath = req.files.teacherFile[0].path;

    // 🟢 Extract text
    const studentText = await extractText(studentPath, true);
    const teacherText = await extractText(teacherPath, false);

    console.log("Student Text:", studentText.slice(0, 100));
    console.log("Teacher Text:", teacherText.slice(0, 100));

    const prompt = `
You are an AI teacher.

Compare the student's answer with the teacher's answer.

Teacher Answer:
${teacherText}

Student Answer:
${studentText}

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

    res.json({
      message: "Full evaluation complete",
      result
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