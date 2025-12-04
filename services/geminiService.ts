import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message, Role, Language } from "../types";

// Base instructions
const BASE_INSTRUCTION = `
You are STANDAPP, an advanced psychological consulting AI assistant.
Your goal is to provide empathetic, evidence-based support for users dealing with stress, anxiety, phobias, and general mental health concerns.

GUIDELINES:
1. **Empathy First**: Always validate the user's feelings. Be warm, non-judgmental, and patient.
2. **CBT & Mindfulness**: Use principles from Cognitive Behavioral Therapy (reframing thoughts) and Mindfulness (grounding techniques).
3. **Safety Critical**: You are NOT a doctor. If a user expresses intent of self-harm, suicide, or harm to others, provide crisis resource reminders and urge them to seek professional help.
4. **Conciseness**: Keep responses digestible.
`;

const getSystemInstruction = (language: Language, userName?: string) => {
  const langInstruction = language === Language.SINHALA 
    ? "LANGUAGE REQUIREMENT: You MUST communicate ONLY in the Sinhala language (සිංහල). Use the Sinhala script." 
    : "LANGUAGE REQUIREMENT: You MUST communicate ONLY in English.";

  const nameInstruction = userName ? `The user's name is ${userName}. Address them by name occasionally.` : "";

  return `${BASE_INSTRUCTION}\n${langInstruction}\n${nameInstruction}`;
};

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const createChatSession = (language: Language = Language.SINHALA, userName?: string): Chat => {
  const ai = getClient();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: getSystemInstruction(language, userName),
      temperature: 0.7,
    },
  });
};

export const generatePhobiaHierarchy = async (phobia: string, language: Language = Language.SINHALA): Promise<string> => {
  const ai = getClient();
  
  const langPrompt = language === Language.SINHALA 
    ? "The response MUST be in Sinhala language." 
    : "The response MUST be in English.";

  const prompt = `Create a 5-step systematic desensitization hierarchy for someone with a fear of: ${phobia}.
  ${langPrompt}
  The steps should go from least anxiety-provoking (1) to most anxiety-provoking (5).
  For each step, provide a brief description and a specific coping tip.
  
  Return ONLY JSON in this format:
  {
    "title": "[Phobia Name] Overcoming/ජය ගැනීම",
    "steps": [
      { "level": 1, "description": "...", "copingTip": "..." },
      ...
    ]
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    return response.text || '{}';
  } catch (error) {
    console.error("Error generating hierarchy:", error);
    throw error;
  }
};

export const generateAddictionPlan = async (addiction: string, language: Language = Language.SINHALA): Promise<string> => {
  const ai = getClient();
  
  const langPrompt = language === Language.SINHALA 
    ? "The response MUST be in Sinhala language." 
    : "The response MUST be in English.";

  const prompt = `Create a 30-Day Recovery Plan (broken down into 4 weeks) for overcoming addiction to: ${addiction}.
  ${langPrompt}
  
  The plan should be practical, psychological, and behavioral.
  
  Return ONLY JSON in this format:
  {
    "title": "Recovery Plan for [Addiction]",
    "weeks": [
      { 
        "weekNumber": 1, 
        "focus": "Brief theme of the week", 
        "tasks": ["Task 1", "Task 2", "Task 3"] 
      },
      ... (up to week 4)
    ]
  }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    return response.text || '{}';
  } catch (error) {
    console.error("Error generating addiction plan:", error);
    throw error;
  }
};

export const sendMessageStream = async (
  chat: Chat,
  message: string,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    const result = await chat.sendMessageStream({ message });
    
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Streaming error:", error);
    onChunk("\n\n*Connection error. Please try again.*");
  }
};
