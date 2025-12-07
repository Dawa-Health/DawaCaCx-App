
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult } from "../types";

let genAI: GoogleGenAI | null = null;

// Initialize the API client safely
try {
  if (process.env.API_KEY) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
} catch (e) {
  console.error("Failed to initialize GoogleGenAI", e);
}

export const analyzeVIAImage = async (base64Image: string): Promise<AnalysisResult> => {
  // Configuration for MedSigLIP
  const MODEL_ID = "KhanyiTapiwa00/medsiglip-diagnosis";
  const API_URL = `https://api-inference.huggingface.co/models/${MODEL_ID}`;
  
  // Use HF_TOKEN if available, otherwise try API_KEY (fallback)
  const apiKey = process.env.HF_TOKEN || process.env.VITE_HF_TOKEN || process.env.API_KEY;

  if (!apiKey) {
    return {
        imageUrl: base64Image,
        label: "Configuration Error",
        confidence: 0,
        suspicionLevel: 'Low',
        recommendation: "API Key missing. Please set HF_TOKEN or API_KEY in environment variables.",
        error: "Missing API Key"
    };
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
      return {
          imageUrl: base64Image,
          label: "Service Error",
          confidence: 0,
          suspicionLevel: 'Low',
          recommendation: `Analysis Failed: Server returned ${response.status}. Please try again later.`,
          error: `HTTP ${response.status}`
      };
    }

    const result = await response.json();

    // 3. Process Classification Result
    // MedSigLIP likely returns an array of { label: string, score: number }
    if (Array.isArray(result) && result.length > 0 && result[0].label) {
      // Find the top prediction
      const sorted = result.sort((a: any, b: any) => b.score - a.score);
      const top = sorted[0];
      const confidence = parseFloat((top.score * 100).toFixed(1));
      const label = top.label.trim();

      // Map labels to Clinical Report Format
      // We interpret common labels like "Positive", "Negative", "Normal", "Lesion"
      let suspicion: 'Low' | 'Medium' | 'High' = "Low";
      let recommendation = "Routine screening as per standard schedule.";
      
      const l = label.toLowerCase();
      
      if (l.includes("positive") || l.includes("cancer") || l.includes("high grade") || l.includes("cin2") || l.includes("cin3") || l.includes("hsil") || l.includes("abnormal")) {
        suspicion = "High";
        recommendation = "Refer for colposcopy and biopsy immediately. Consider 'See and Treat' if eligible.";
      } else if (l.includes("suspicious") || l.includes("low grade") || l.includes("cin1") || l.includes("lsil")) {
        suspicion = "Medium";
        recommendation = "Repeat VIA in 6-12 months or refer for triage testing (HPV DNA).";
      } else if (l.includes("negative") || l.includes("normal") || l.includes("benign")) {
        suspicion = "Low";
        recommendation = "Routine screening interval (e.g., 3-5 years) recommended.";
      }

      return {
          imageUrl: base64Image,
          label: label,
          confidence: confidence,
          suspicionLevel: suspicion,
          recommendation: recommendation,
          rawOutput: result
      };
    } 
    
    return {
        imageUrl: base64Image,
        label: "Unknown Format",
        confidence: 0,
        suspicionLevel: 'Low',
        recommendation: "Model returned unrecognized data format. Please verify manually.",
        rawOutput: result
    };

  } catch (error) {
    console.error("Gemini/HF Analysis Error:", error);
    return {
        imageUrl: base64Image,
        label: "Network Error",
        confidence: 0,
        suspicionLevel: 'Low',
        recommendation: "Error analyzing image. Please check your internet connection.",
        error: String(error)
    };
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
