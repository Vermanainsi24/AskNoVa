import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Directly assign the API key (DO NOT expose in production)
const apiKey = "AIzaSyBCLEGjY9-Fqd_OsC0G-EtSomof8xuUUCA"; 

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text(); // Correctly fetch text

    console.log("API Response:", responseText); // Debugging
    return responseText; // ✅ Ensure the response is returned
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Error fetching response.";
  }  // ✅ Correctly closed catch block
}

export default run;
