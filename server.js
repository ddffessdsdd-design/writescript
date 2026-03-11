const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.get("/script", async (req, res) => {
  const prompt = req.query.prompt;
  if (!prompt) return res.status(400).send("Missing prompt.");
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENROUTER_API_KEY
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
        messages: [{ role: "user", content: "Write a Roblox Studio Lua script for: " + prompt + ". Only reply with code in a code block." }]
      })
    });
    const data = await response.json();
    console.log(JSON.stringify(data));
    const text = data?.choices?.[0]?.message?.content || JSON.stringify(data);
    res.send(text);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(PORT, () => console.log("Running on port " + PORT));
