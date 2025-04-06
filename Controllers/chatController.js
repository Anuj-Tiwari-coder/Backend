const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAwhFtzzgaz_sCB9EGz1VKpCRWCt6u_Meg");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chatWithGemini = async (req, res) => {
    try {
        const { message, context = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        let prompt = "";
        context.forEach((msg) => {
            if (msg.user) prompt += `User: ${msg.user}\n`;
            if (msg.bot) prompt += `Gemini: ${msg.bot}\n`;
        });

        prompt += `User: ${message}\nGemini:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("Gemini API Error:", error.message);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

module.exports = { chatWithGemini };
