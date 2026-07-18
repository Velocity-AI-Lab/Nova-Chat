import { GoogleGenAI } from "@google/genai";
// set api key
const apiKey = Bun.env.GEMINI_API_KEY;
// check if apikey exists or not
if (!apiKey) {
  throw new Error("Missing Gemini Api Key in enviroment variables");
}

// create googleGen ai client
export const gemini = new GoogleGenAI({ apiKey });
