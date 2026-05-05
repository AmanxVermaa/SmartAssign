const path = require("path");
const fs = require("fs");

const extractTextFromOCR = async (filePath) => {
  try {
    const pdf = require("pdf-poppler");
    const Tesseract = require("tesseract.js");
    const options = {
      format: "png",
      out_dir: path.dirname(filePath),
      out_prefix: path.basename(filePath, path.extname(filePath)),
      page: null
    };

    await pdf.convert(filePath, options);

    const files = fs.readdirSync(path.dirname(filePath));

    const imageFiles = files.filter(file =>
      file.startsWith(path.basename(filePath, path.extname(filePath))) &&
      file.endsWith(".png")
    );

    let fullText = "";

    for (let img of imageFiles) {
      const imgPath = path.join(path.dirname(filePath), img);

      const { data: { text } } = await Tesseract.recognize(imgPath, "eng");

      fullText += text + "\n";

      fs.unlinkSync(imgPath); // cleanup
    }

    return fullText;

  } catch (err) {
    console.error("OCR Error:", err);
    return "";
  }
};

module.exports = { extractTextFromOCR };