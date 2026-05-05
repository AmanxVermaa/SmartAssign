const path = require("path");

const preprocessImage = async (imagePath) => {
  if (imagePath.includes("-processed")) {
    return imagePath;
  }

  const sharp = require("sharp");

  const dir = path.dirname(imagePath);
  const fileName = path.basename(imagePath, ".png");

  const processedPath = path.join(dir, fileName + "-processed.png");

  await sharp(imagePath)
    .grayscale()
    .normalize()
    .sharpen()
    .toFile(processedPath);

  return processedPath;
};

const extractTextFromImage = async (imagePath) => {
  try {

    console.log(" Preprocessing image...");

    const processedImage = await preprocessImage(imagePath);

    console.log(" Running OCR on:", processedImage);

    const Tesseract = require("tesseract.js");
    const result = await Tesseract.recognize(
      processedImage,
      "eng",
      {
        logger: m => console.log(m),
        tessedit_pageseg_mode: 6
      }
    );

    return result.data.text;

  } catch (error) {
    console.error(error);
    throw new Error("OCR failed");
  }
};

module.exports = { extractTextFromImage };