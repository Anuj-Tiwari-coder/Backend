const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = process.env.GEMINI_API_KEY;

router.post("/chat", async (req, res) => {
    const { messages } = req.body;

    try {
        const geminiRes = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: messages.map((msg) => ({
                    role: msg.role,
                    parts: [{ text: msg.content }],
                })),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": API_KEY,
                },
            }
        );

        const response =
            geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || "🤖 No response";

        res.json({ response });
    } catch (err) {
        console.error("Gemini API error:", err.message);
        res.status(500).json({ response: "Error contacting AI." });
    }
});

module.exports = router;
