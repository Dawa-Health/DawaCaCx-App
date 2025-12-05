import { GoogleGenAI } from "@google/genai";

let genAI: GoogleGenAI | null = null;

// Initialize the API client safely
try {
  if (process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI", e);
}

export const analyzeVIAImage = async (base64Image: string): Promise<string> => {
  if (!genAI) {
    return "AI Service Unavailable: API Key missing.";
  }

  // Remove data URL prefix if present for proper base64
  const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64
            }
          },
          {
            text: `You are a medical assistant specializing in cervical cancer screening using VIA (Visual Inspection with Acetic Acid). 
            Analyze this image for any acetowhite lesions, abnormal vascular patterns, or other signs of dysplasia. 
            Provide a concise observation summary. 
            Format:
            - **Observation**: [Details]
            - **Suspicion Level**: [Low/Medium/High]
            - **Recommendation**: [Action]
            
            Disclaimer: This is an AI-assisted observation and not a medical diagnosis. Confirmation by a trained professional is required.`
          }
        ]
      }
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "Error analyzing image. Please try again or consult a specialist manually.";
  }
};

export const chatWithAssistant = async (message: string, context?: string): Promise<string> => {
   if (!genAI) return "AI Service Unavailable.";
   
   try {
     const response = await genAI.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: `Context: ${context || 'General Medical Assistant'}. User Question: ${message}`,
       config: {
         systemInstruction: "You are a helpful medical assistant for a VIA screening app. Keep answers brief and professional."
       }
     });
     return response.text || "I didn't understand that.";
   } catch (error) {
     return "Error connecting to assistant.";
   }
};
