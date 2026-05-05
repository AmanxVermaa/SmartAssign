const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const convertPDFtoImage = (pdfPath) => {
  return new Promise((resolve, reject) => {

    const outputDir = path.join(__dirname, "../uploads");
    const outputPrefix = path.join(outputDir, "page");

    // Clean old images
    fs.readdirSync(outputDir).forEach(file => {
      if (file.startsWith("page-") && file.endsWith(".png")) {
        fs.unlinkSync(path.join(outputDir, file));
      }
    });

    // Convert PDF → Images
    const command = `pdftoppm -png -r 300 "${pdfPath}" "${outputPrefix}"`;

    console.log("📄 Running command:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(" Conversion error:", error);
        return reject(error);
      }

      const files = fs.readdirSync(outputDir);
      const imageFiles = files
        .filter(file => file.startsWith("page-") && file.endsWith(".png"))
        .sort();

      if (imageFiles.length === 0) {
        console.log("❌ No image found in uploads folder");
        return reject(new Error("PDF to Image conversion failed"));
      }

      const imagePaths = imageFiles.map(file =>
        path.join(outputDir, file)
      );

      console.log("✅ Images created:", imagePaths.length);
      resolve(imagePaths);
    });

  });
};

module.exports = { convertPDFtoImage };