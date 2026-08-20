require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

    const interaction = await ai.interactions.create({
      model: 'gemini-3.6-flash',
      input: `Tum ek Instagram business page ke comments ka jawab de rahi ho.

Post ka context: "${postContext || 'Koi khaas context nahi diya gaya.'}"
Comment: "${comment}"

  IMPORTANT RULES:
  - Sirf EK final jawab do.
  - Kabhi "Option 1", "Option 2" ya list mat likho.
  - Sirf woh ek jawab likho jo seedha comment section mein post ho sake.
  - Comment ka tone samjho, usi ya thoda behtar tone mein, chhota aur natural jawab do.
  - Jis zaban/style mein comment hai, usi mein jawab do.

  Sirf jawab likho, kuch aur nahi.`,
    });

    res.status(200).json({ reply: interaction.output_text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Reply generate nahi ho saka. Dobara try karo.' });
  }
};
