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
  // Configuration for MedSigLIP
  const MODEL_ID = "KhanyiTapiwa00/medsiglip-diagnosis";
  const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;
  
  // Use HF_TOKEN if available, otherwise try API_KEY (user might have set the HF key there for this task)
  const apiKey = process.env.HF_TOKEN || process.env.VITE_HF_TOKEN || process.env.API_KEY;

  if (!apiKey) {
    return "Service Error: API Key missing. Please set HF_TOKEN or API_KEY.";
  }

  try {
    // 1. Convert Data URI to Blob for binary upload
    const res = await fetch(base64Image);
    const blob = await res.blob();

    // 2. Query Hugging Face Inference API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/octet-stream",
      },
      body: blob,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HF API Error:", response.status, errorText);
      return `Analysis Failed: Server returned ${response.status}. Ensure the model is loaded and you have permission.`;
    }

    const result = await response.json();

    // 3. Process Classification Result
    // MedSigLIP likely returns an array of { label: string, score: number }
    if (Array.isArray(result) && result.length > 0 && result[0].label) {
      // Find the top prediction
      const sorted = result.sort((a: any, b: any) => b.score - a.score);
      const top = sorted[0];
      const confidence = (top.score * 100).toFixed(1);
      const label = top.label.trim();

      // Map labels to Clinical Report Format
      // We interpret common labels like "Positive", "Negative", "Normal", "Lesion"
      let suspicion = "Low";
      let recommendation = "Routine screening as per standard schedule.";
      
      const l = label.toLowerCase();
      
      if (l.includes("positive") || l.includes("cancer") || l.includes("high grade") || l.includes("cin") || l.includes("hsil") || l.includes("abnormal")) {
        suspicion = "High";
        recommendation = "Refer for colposcopy and biopsy immediately.";
      } else if (l.includes("suspicious") || l.includes("low grade") || l.includes("lsil")) {
        suspicion = "Medium";
        recommendation = "Repeat VIA in 2-4 weeks or refer for triage.";
      } else if (l.includes("negative") || l.includes("normal") || l.includes("benign")) {
        suspicion = "Low";
        recommendation = "Routine screening interval (e.g., 3-5 years).";
      }

      return `**Observation**: MedSigLIP classification identifies '${label}' with ${confidence}% confidence.
**Suspicion Level**: ${suspicion}
**Recommendation**: ${recommendation}

Disclaimer: Automated analysis using ${MODEL_ID}. Verify clinically.`;
    } 
    
    // Fallback if result format is unexpected (e.g., text generation)
    if (Array.isArray(result) && result[0].generated_text) {
        return `**MedSigLIP Output**: ${result[0].generated_text}`;
    }

    return "Analysis Result: Model returned unrecognized data format.";

  } catch (error) {
    console.error("Gemini/HF Analysis Error:", error);
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