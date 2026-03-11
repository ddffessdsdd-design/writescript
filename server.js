const express = require(“express”);
const app = express();
const PORT = process.env.PORT || 3000;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

app.get(”/script”, async (req, res) => {
const prompt = req.query.prompt;

if (!prompt) {
return res.status(400).send(“Missing prompt parameter.”);
}

try {
const response = await fetch(“https://openrouter.ai/api/v1/chat/completions”, {
method: “POST”,
headers: {
“Content-Type”: “application/json”,
“Authorization”: `Bearer ${OPENROUTER_API_KEY}`
},
body: JSON.stringify({
model: “mistralai/mistral-7b-instruct:free”,
messages: [
{
role: “user”,
content: `You are a Roblox Studio Lua scripting expert. Write a clean, working Roblox Studio Lua script for the following request: "${prompt}". Only reply with the code inside a code block. No explanations.`
}
]
}),
});

```
const data = await response.json();
const scriptText =
  data.choices?.[0]?.message?.content ||
  "Error: No response from AI.";
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
