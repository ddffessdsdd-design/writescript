const express = require(“express”);
const app = express();
const PORT = process.env.PORT || 3000;

// Your Anthropic API key - set this in Render’s environment variables
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

app.get(”/script”, async (req, res) => {
const prompt = req.query.prompt;

if (!prompt) {
return res.status(400).send(“Missing prompt parameter.”);
}

try {
const response = await fetch(“https://api.anthropic.com/v1/messages”, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“x-api-key”: ANTHROPIC_API_KEY,
“anthropic-version”: “2023-06-01”,
},
body: JSON.stringify({
model: “claude-sonnet-4-20250514”,
max_tokens: 1024,
messages: [
{
role: “user”,
content: `You are a Roblox Studio Lua scripting expert. Write a clean, working Roblox Studio Lua script for the following request: "${prompt}". Only reply with the raw code inside a code block. No explanations.`,
},
],
}),
});

```
const data = await response.json();
const scriptText = data.content?.[0]?.text || "Error: No response from AI.";
res.send(scriptText);
```

} catch (err) {
console.error(err);
res.status(500).send(“Server error: “ + err.message);
}
});

app.listen(PORT, () => {
console.log(`WriteScript server running on port ${PORT}`);
});
