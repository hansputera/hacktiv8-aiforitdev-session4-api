import { GoogleGenAI } from "@google/genai";
import { configEnv } from "../config/index.js";

export const googleAi = new GoogleGenAI({
    apiKey: configEnv.GEMINI_API_KEY,
});
