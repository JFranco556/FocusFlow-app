import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { ChatMessage } from "@/lib/models/ChatMessage";

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const userId = (session.user as any).id || session.user.email;

    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }
    
    const lastMessage = messages[messages.length - 1];
    
    await connectToDatabase();
    // Guardar mensaje del usuario
    await ChatMessage.create({
      userId,
      role: "user",
      content: lastMessage.content
    });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: lastMessage.content || lastMessage.text || JSON.stringify(lastMessage),
        config: {
          systemInstruction: "Eres FlowAI, un asistente académico inteligente y motivador. Ayudas al usuario a gestionar su tiempo, priorizar tareas y mantenerse enfocado.",
        }
    });

    // Guardar respuesta de la IA
    await ChatMessage.create({
      userId,
      role: "model",
      content: response.text
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
