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
  - Sirf woh ek jawab likho jo seedha comment section mein post ho sake — koi label ya prefix mat likho jaisa "Final reply:" ya "Option for final output:".
  - Comment ka tone samjho, usi ya thoda behtar tone mein, chhota aur natural jawab do.
  - Comment ki zaban STRICTLY match karo: agar comment pure English mein hai to reply BHI pure English mein do (Roman Urdu bilkul mat mix karo). Agar comment Roman Urdu mein hai to reply Roman Urdu mein do. Agar comment mix hai to reply bhi similar mix rakho.
  - Agar comment mein koi specific fact, promise, timeline, ya order/status ke baare mein poocha ja raha ho jiska tumhe pakka pata nahi (jaise "yeh sach hai?", "kab milega", "aap yeh layenge?"), to confidently confirm ya deny mat karo. Iske bajaye ek generic, safe reply do jaise "Yeh confirm karne ke liye please humein DM karein, hum exact detail bata denge." Sirf general/social comments (jaise price ke baare mein general baat, greeting, opinion) ka hi directly jawab do.

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