const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  try {
    const userMsg = req.body.message;
    console.log("USER SAID:", userMsg);

    const response = await client.responses.create({
      model: "gpt-4o-mini",          
      input: userMsg,                //  new API format
    });

    const aiReply = response.output_text;  //  new output format

    res.json({ reply: aiReply });

  } catch (err) {
    console.error("FULL OPENAI ERROR:", JSON.stringify(err, null, 2));
    res.json({ reply: " AI server error." });
  }
});

app.listen(5000, () => console.log(" Backend running on port 5000"));
