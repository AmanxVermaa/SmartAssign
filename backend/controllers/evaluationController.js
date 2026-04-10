const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

Evaluate and return strictly in JSON format:

{
  "score": number (out of 20),
  "feedback": "short feedback",
  "similarity": number (0-100),
  "plagiarism": number (0-100)
}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3
    });

    let result = response.choices[0].message.content;

    try {
      result = JSON.parse(result);
    } catch (err) {
      console.log("Raw AI response:", result);
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

module.exports = { evaluateAnswer };