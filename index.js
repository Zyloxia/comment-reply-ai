require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateReply(commentText, postContext) {
  const interaction = await ai.interactions.create({
    model: 'gemini-3.6-flash',
    input: `Tum ek Instagram business page ke comments ka jawab de rahi ho.
      
Post ka context: "${postContext}"
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
  const postContext = "Zodiac sign Capricorn ke logo ki soch aur personality traits ke baare mein post - woh practical, ambitious aur kbhi kbhi overthink krty hain.";
  const testComment = "I'm done with my friend who always want to make plan for everything.";
  const reply = await generateReply(testComment, postContext);
  console.log(reply);
}

main();