const fs = require("fs");
const pdf = require("pdf-parse");

const extractTextFromPDF = async (req, res) => {
    try {
        const filePath = req.file.path;
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);

        res.json({
            message: "Text extracted Successfully",
            text: data.text
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Failed to extract text" });
    }
};

module.exports = { extractTextFromPDF };