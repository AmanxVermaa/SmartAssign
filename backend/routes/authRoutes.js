const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Teacher = require("../models/Teacher");

// SIGNUP
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Teacher.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        
        const hashed = await bcrypt.hash(password, 10);

        const user = await Teacher.create({
            name,
            email,
            password: hashed
        });

        res.json({
            message: "Signup successful",
            user
        })
    } catch (error) {
        console.error("SIGNUP ERROR: ", error);
        res.status(500).json({ error: "Signup failed" }); 
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Teacher.findOne({ email });

        if(!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ error: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.json({
            message: "Login Successful",
            token
        });
    } catch (error) {
        // console.error("LOGIN ERROR:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;