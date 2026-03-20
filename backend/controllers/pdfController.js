const fs = require("fs");
const pdf = require("pdf-parse");

const { convertPDFtoImage } = require("../utils/pdfToImage");
const { extractTextFromImage } = require("./ocrController");
const { cleanText } = require("../utils/cleanText"); 
const { cleanTextWithAI } = require("../utils/aiTextCleaner");

const processAssignment = async (req, res) => {

  try {

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const data = await pdf(dataBuffer);

    let text = data.text;

    if (!text || text.trim().length < 20) {

      const imagePaths = await convertPDFtoImage(filePath);

      let finalText = "";
      let pageNumber = 1;
      for (const imagePath of imagePaths) {
        console.log(" Running OCR on:", imagePath);

        const pageText = await extractTextFromImage(imagePath);
        finalText += `\n\n--- Page ${pageNumber} ---\n\n${pageText}`;
        pageNumber++;
      }

      text = await cleanText(finalText);

    }

    const cleanedText = await cleanTextWithAI(text);

    res.json({
      message: "Assignment processed",
      rawtext: text,
      cleanedText: cleanedText
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Processing failed"
    });
  }

};

module.exports = { processAssignment };