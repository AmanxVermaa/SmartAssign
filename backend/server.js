const express = require("express");
const cors = require("cors");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
    res.send("SmartAssign-AI Based Assignment Evaluation System Backend running");
});

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});