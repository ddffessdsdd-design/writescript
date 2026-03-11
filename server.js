const express = require(“express”);
const app = express();
const PORT = process.env.PORT || 3000;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.get(”/script”, async (req, res) => {
const prompt = req.query.prompt;

if (!prompt) {
return res.status(400).send(“Missing prompt parameter.”);
}

try {
const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
{
method: “POST”,
headers: { “Content-Type”: “application/json” },
body: JSON.stringify({
contents: [
{
parts: [
{
text: `You are a Roblox Studio Lua scripting expert. Write a clean, working Roblox Studio Lua script for the following request: "${prompt}". Only reply with the code inside a code block. No explanations.`,
},
],
},
],
}),
}
);

```
const data = await response.json();
const scriptText =
  data.candidates?.[0]?.content?.parts?.[0]?.text ||
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
