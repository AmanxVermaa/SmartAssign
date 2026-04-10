const { chatSession } = require("../script/index");

const cleanTextWithAI = async (rawText) => {
  try {

    const prompt = `
You are an OCR text correction system.

Fix the following text:
- Correct spelling mistakes
- Fix broken words
- Remove random symbols
- Make sentences meaningful
- Keep original meaning

Text:
"${rawText}"
`;

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();

  } catch (error) {
    console.error(error);
    return rawText; // fallback
  }
};

module.exports = { cleanTextWithAI };


// require('dotenv').config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// // Initialize Gemini
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Use Gemini model
// const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// const cleanTextWithAI = async (rawText) => {
//   try {
//     const prompt = `
// You are an OCR text correction system.

// Fix the following text:
// - Correct spelling mistakes
// - Fix broken words
// - Remove random symbols
// - Make sentences meaningful
// - Keep original meaning

// Text:
// "${rawText}"
// `;

//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     return text;

//   } catch (error) {
//     console.error(error);
//     return rawText; // fallback
//   }
// };

// module.exports = { cleanTextWithAI };