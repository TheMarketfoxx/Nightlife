import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }
  
  try {
    const { message } = req.body;
    
    // Validate input: nonempty string, trimmed, and max 300 characters.
    if (
      !message ||
      typeof message !== "string" ||
      message.trim().length === 0 ||
      message.length > 300
    ) {
      return res.status(400).json({ error: "Invalid message" });
    }
    
    const prompt = `You are an AI assistant for a nightlife media platform. Answer the following question conversationally:\n\nUser: ${message}\nAI:`;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    });
    
    const aiMessage = response.data.choices[0].text.trim();
    return res.status(200).json({ reply: aiMessage });
  } catch (error) {
    console.error("Error in /api/ai-chat:", error);
    return res.status(500).json({ error: error.message || "An error occurred" });
  }
}
