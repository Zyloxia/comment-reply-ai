require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Ye trigger phrases dhoondte hain jab koi comment kisi fact/promise ka confirmation maang raha ho
const RISKY_PATTERNS = [
  /sach\s*h(ai)?/i,
  /true\s*(right|na)?/i,
  /confirm/i,
  /guarantee/i,
  /promise/i,
  /sir\s*ne\s*(bola|kaha)/i,
  /team\s*ne\s*(bola|kaha)/i,
  /aap\s*ne\s*(bola|kaha)/i,
  /is\s*this\s*true/i,
  /you\s*(said|promised|guaranteed)/i,
  /(sahi|shi)\s*h(ai)?\s*(na|kya)?/i,
];

const SAFE_FALLBACK_REPLY = "Iski exact confirmation ke liye please humein DM karein, hum aapko sahi detail batayenge.";

function isRiskyComment(comment) {
  return RISKY_PATTERNS.some((pattern) => pattern.test(comment));
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { comment, postContext } = req.body || {};

    if (!comment || !comment.trim()) {
      res.status(400).json({ error: 'Comment is required' });
      return;
    }

    // Safety net: agar risky pattern mila, AI ko call hi mat karo
    if (isRiskyComment(comment)) {
      res.status(200).json({ reply: SAFE_FALLBACK_REPLY });
      return;
    }

    const interaction = await ai.interactions.create({
      model: 'gemini-3.6-flash',
      input: `Tum ek Instagram business page ke comments ka jawab de rahi ho.

Post ka context: "${postContext || 'Koi khaas context nahi diya gaya.'}"
Comment: "${comment}"

  IMPORTANT RULES:
  - Sirf EK final jawab do.
  - Kabhi "Option 1", "Option 2" ya list mat likho.
  - Sirf woh ek jawab likho jo seedha comment section mein post ho sake — koi label ya prefix mat likho.
  - Comment ka tone samjho, usi ya thoda behtar tone mein, chhota aur natural jawab do.
  - Comment ki zaban STRICTLY match karo: agar comment pure English mein hai to reply BHI pure English mein do. Agar comment Roman Urdu mein hai to reply Roman Urdu mein do.

  Sirf jawab likho, kuch aur nahi.`,
    });

    res.status(200).json({ reply: interaction.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Reply generate nahi ho saka. Dobara try karo.' });
  }
};