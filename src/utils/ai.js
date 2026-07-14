import { GoogleGenAI } from '@google/genai';
import config from '../config/config.js';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });

const promptAI = async (promptMessage) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptMessage,
  });
  console.log("Gemini Response:", response);

  return response.text;;
}

export default promptAI;