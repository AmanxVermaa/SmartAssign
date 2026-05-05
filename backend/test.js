const { convertPDFtoImage } = require('./utils/pdfToImage');
const { extractTextFromOCR } = require('./utils/ocr');
const path = require('path');

async function test() {
  try {
    const pdfPath = path.join(__dirname, 'uploads', '1776097166412-Profile-fit_Synopsis.pdf');
    console.log('Testing PDF to Image...');
    const images = await convertPDFtoImage(pdfPath);
    console.log('Images created:', images.length);

    console.log('Testing OCR...');
    const text = await extractTextFromOCR(pdfPath);
    console.log('OCR Text length:', text.length);
    console.log('First 200 chars:', text.substring(0, 200));

    console.log('Test passed!');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

test();