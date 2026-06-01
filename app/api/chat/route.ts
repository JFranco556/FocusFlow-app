import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Google Gen AI client
// It will automatically use process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Convert chat history to Gemini format if necessary
    // Here we assume the frontend sends a simple list of `{ role: 'user' | 'model', parts: [{ text: '...' }] }`
    // OR we just take the last user message for simplicity. Let's take the last message.
    
    const lastMessage = messages[messages.length - 1];
    
    // Simplest call to gemini-2.5-flash
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: lastMessage.content || lastMessage.text || JSON.stringify(lastMessage),
        config: {
          systemInstruction: "Eres FlowAI, un asistente académico inteligente y motivador. Ayudas al usuario a gestionar su tiempo, priorizar tareas y mantenerse enfocado.",
        }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Error communicating with AI Assistant" },
      { status: 500 }
    );
  }
}
