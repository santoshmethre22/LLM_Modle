import axios from 'axios';
import dotenv from 'dotenv';
import readline from "readline-sync";

dotenv.config();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const useGemini = async (prompt) => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_API_KEY}`;
    const res = await axios.post(url, {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    });

    const text = res.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("\nGemini Response:\n", text || "No response received.");

  } catch (error) {
    console.error("Error:", error.message);
    if (error.response?.data) {
      console.error("Details:", JSON.stringify(error.response.data, null, 2));
    }
  }
};

//useGemini(prompt);


const useOllama=async(prompt)=>{
    try {
        const model="llama3.2:1b"
        
        const url ="http://localhost:11434/api/generate";
        const res = await axios.post(url, {
      model: model,
      prompt: prompt,
    });
    
    console.log(res.data.response);
    
} catch (error) {
    console.error("Ollama Error:", error.message);
}

}
const prompt = readline.question("📝 Enter your prompt: ");

useOllama(prompt);
