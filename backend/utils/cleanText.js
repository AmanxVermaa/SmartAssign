const cleanText = (text) => {

  return text
    // remove weird symbols
    .replace(/[^a-zA-Z0-9\s.,()\-]/g, " ")

    .replace(/\b[A-Z]{1,2}\b/g, "")

    // remove extra spaces
    .replace(/\s+/g, " ")

    // fix spacing
    .replace(/\s([.,])/g, "$1")

    // trim
    .trim();
};

module.exports = { cleanText };