require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateReply(commentText, postContext) {
  const interaction = await ai.interactions.create({
    model: 'gemini-3.6-flash',
    input: `Tum ek Instagram business page ke comments ka jawab de rahi ho.
      
Post ka context: "${postContext}"
Comment: "${commentText}"

  ⚠️ SABSE ZAROORI RULE (ye baaki sab rules se zyada important hai, ise kabhi mat todna):
Agar comment mein koi SPECIFIC FACT, PROMISE, TIMELINE, product quality/feature ka claim, ya kisi insaan (jaise "sir", "team", "aap") ke kahe hue baat ka confirmation maanga ja raha ho — jaise "sach hai na", "kab milega", "sir ne jo kaha woh sahi hai kya", "ye waterproof hai kya", "guarantee hai" — to tumhe HARGIZ "haan", "ji bilkul", "sach hai", ya koi bhi confirming/confident jawab NAHI dena hai, chahe comment ya context mein us baat ka zikr ho ya na ho. Tumhe pata nahi ke wo baat sach hai ya nahi — isliye sirf yeh jawab do: "Iski exact confirmation ke liye please humein DM karein, hum aapko sahi detail batayenge." Bas itna hi likho, kuch aur mat add karo.

Agar comment sirf GENERIC/SOCIAL ho (jaise price ke baare mein general baat, greeting, opinion, color, general appreciation) — tab neeche wale normal rules follow karo:

  IMPORTANT RULES:
  - Sirf EK final jawab do.
  - Kabhi "Option 1", "Option 2" ya list mat likho.
  - Sirf woh ek jawab likho jo seedha comment section mein post ho sake — koi label ya prefix mat likho jaisa "Final reply:" ya "Option for final output:".
  - Comment ka tone samjho, usi ya thoda behtar tone mein, chhota aur natural jawab do.
  - Comment ki zaban STRICTLY match karo: agar comment pure English mein hai to reply BHI pure English mein do (Roman Urdu bilkul mat mix karo). Agar comment Roman Urdu mein hai to reply Roman Urdu mein do. Agar comment mix hai to reply bhi similar mix rakho.
  - AI ko sirf woh sawaal directly answer karne hain jo GENERIC/SOCIAL hon (jaise price, greeting, general opinion, product ka color). Agar comment mein koi SPECIFIC FACT, PROMISE, TIMELINE, ya kisi insaan (jaise "sir", "team") ke kahe hue baat ka confirmation maanga ja raha ho — jaise "kya yeh sach hai", "kab milega", "sir ne jo kaha woh sahi hai kya" — AI ko HARGIZ "haan bilkul sahi hai" ya "ji zaroor" jaisa confident jawab nahi dena. Iske bajaye AI ko yeh type ka safe, neutral jawab dena chahiye: "Iski exact confirmation ke liye please humein DM karein, hum aapko sahi detail batayenge." AI ko kabhi khud se guess karke confirm/promise nahi karna, chahe comment mein koi bhi confidence ho.

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