require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateReply(commentText) {
  const interaction = await ai.interactions.create({
    model: 'gemini-3.6-flash',
    input: `Tum ek Instagram business page ke comments ka jawab de rahi ho.

       Comment: "${commentText}"

       IMPORTANT RULES:
       - Sirf EK final jawab do.
       - Kabhi "Option 1", "Option 2" ya list mat likho.
       - Sirf woh ek jawab likho jo seedha comment section mein post ho sake.
       - Comment ka tone samjho, usi ya thoda behtar tone mein, chhota aur natural jawab do.
       - Jis zaban/style mein comment hai, usi mein jawab do.

       Sirf jawab likho, kuch aur nahi.`,
  });

  return interaction.output_text;
}

async function main() {
  const testComment = "Yeh product bahut accha hai! Delivery time kaise hai?";
  const reply = await generateReply(testComment);
  console.log(reply);
}

main();