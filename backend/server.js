require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const PORT = process.env.PORT || 6000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://gemini-lite-8g34.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GROOK_API_KEY = process.env.GROOK_API_KEY;

app.get("/", (req, res) => {
  res.json("working properly");
});

// ---------------- Gemini Route ----------------
app.post("/api/gemini", async (req, res) => {
  const { prompt, model } = req.body;

  // mapping frontend labels -> Gemini API model IDs
  const modelMap = {
    "Gemini 2.5 Flash-Lite": "gemini-2.5-flash-lite",
    "Gemini 2.5 Flash": "gemini-2.5-flash",
    "Gemini 2.5 Pro": "gemini-2.5-pro",
  };

  if (!prompt || !model) {
    return res.status(400).json({ error: "Prompt and model are required" });
  }

  const modelId = modelMap[model];
  if (!modelId) {
    return res.status(400).json({ error: `Unknown model: ${model}` });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }
    );

    console.log("Gemini raw response:", JSON.stringify(response.data, null, 2));
    res.json(response.data); // ✅ send clean Gemini JSON
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ---------------- Groq Route ----------------
app.post("/api/grook", async (req, res) => {
  const { prompt, model } = req.body;

  try {
    const headers = {
      Authorization: `Bearer ${GROOK_API_KEY}`,
      "Content-Type": "application/json",
    };

    const groqResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model, // 👈 dynamic model
        messages: [{ role: "user", content: prompt }],
      },
      { headers }
    );

    res.json(groqResponse.data);
  } catch (err) {
    console.error("Groq API error:", err.response?.data || err.message);
    res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is running on port:", PORT);
});
