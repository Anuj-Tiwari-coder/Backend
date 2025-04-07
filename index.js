const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
const { chatWithGemini } = require("./Controllers/chatController");
require('dotenv').config();


const app = express();
app.use(cors({
    origin: 'https://agent-bay.vercel.app',
    credentials: true,
}));
app.use(express.json());

app.post("/api/chat", chatWithGemini);
app.get('/', (req, res) => {
    res.send('Hello World!')
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

