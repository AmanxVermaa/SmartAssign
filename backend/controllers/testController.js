const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const testGeminiAPI = async (req, res) => {
  try {
    const apiKey = process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        message: "GEMINI_API_KEY is not defined in environment variables"
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent("Say 'Gemini API is working perfectly!'");
    const response = await result.response;
    const text = response.text();

    return res.json({
      success: true,
      message: "Gemini API is working",
      response: text
    });

  } catch (error) {
    console.error("Gemini API Test Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Gemini API test failed",
      error: error.message
    });
  }
};

module.exports = { testGeminiAPI };
