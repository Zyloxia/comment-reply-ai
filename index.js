require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function testReply() {
  const interaction = await ai.interactions.create({
    model: 'gemini-3.6-flash',
    input: 'Ek Instagram comment hai: "yeh product kitne ka hai?" Iska ek dosti aur helpful jawab do, Roman Urdu mein.',
  });

  console.log(interaction.output_text);
}

testReply();