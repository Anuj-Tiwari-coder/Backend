const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const { chatWithGemini } = require("./Controllers/chatController");

require('dotenv').config();


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());

app.post("/api/chat", chatWithGemini);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

