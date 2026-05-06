require('dotenv').config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const evaluationRoutes = require("./routes/evaluationRoutes");

const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors({
    origin:"https://smart-assign-six.vercel.app",
    credentials:true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api", evaluationRoutes);

app.get("/", (req, res) => {
    res.send("SmartAssign-AI Based Assignment Evaluation System Backend running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});