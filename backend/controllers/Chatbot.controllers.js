import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const Chatbot = async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({
      success: false,
      message: "Message is required",
    });
  }

  try {
    const assistantProfile = `
You are a portfolio assistant for Utsab Adhikari.
- He is a BEIT student from Nepal.
- currently he is in second semester of the bachelor of engineering in IT (BEIT), College: NCIT, Balkumari Kathmandu, University: Pokhara 
- He knows MERN stack, Express, JS, C, C++, etc.
- He’s building backend skills and AI chatbot systems.
- His contact no is: 9867508725 and his email is: utsabadhikari075@gmail.com
- You can provide this if someone asks for contact or email.
- You answer questions about him, his work, or help people understand his background.
- He is from Nepal, Lumbini Province, district: Arghakhanchi, Panini rural municipality, ward no-4
`;

    const chatCompletion = await openai.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: assistantProfile },
        { role: "user", content: userMessage },
      ],
    });

    const aiMessage = chatCompletion.choices[0].message.content;

    res.json({
      from: "ai",
      message: aiMessage.trim(),
    });
  } catch (error) {
    console.error("OpenAI Error:", error.message);
    res.status(500).json({
      success: false,
      message: ["Internal Server Error", error.message],
    });
  }
};
