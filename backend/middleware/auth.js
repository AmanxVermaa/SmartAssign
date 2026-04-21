const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "No token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 FETCH FULL USER FROM DB
        const user = await Teacher.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = auth;