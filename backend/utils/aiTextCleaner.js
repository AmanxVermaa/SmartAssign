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
