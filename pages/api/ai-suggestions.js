import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  try {
    const { prompt } = req.body;
    // Basic input validation: ensure prompt is a nonempty string
    if (!prompt || typeof prompt !== 'string' || prompt.length > 200) {
      return res.status(400).json({ error: 'Invalid prompt' });
    }
    const aiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Generate a creative event description based on: ${prompt}`,
      max_tokens: 100,
      temperature: 0.7,
    });
    res.status(200).json({ suggestion: aiResponse.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
