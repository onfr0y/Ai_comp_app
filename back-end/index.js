import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBqjY0GgGsrB16D0gtwOw0ztxq2o5JJuho" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "what farm should i do?",
    config: {
      systemInstruction: "set yourself as farmer specialist",
    },
  });
  console.log(response.text);
}

await main();
