import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { ChatMessage } from "@/lib/models/ChatMessage";
// Este será un Client Component donde pondremos el input del chat y renderizaremos los mensajes
import ChatClientApp from "./ChatClientApp";

export default async function ChatPage() {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id || session.user.email;
  await connectToDatabase();

  // Recuperar el historial de chat de MongoDB
  const historyRaw = await ChatMessage.find({ userId }).sort({ createdAt: 1 }).lean();
  const initialMessages = JSON.parse(JSON.stringify(historyRaw));

  return (
    <main className="flex-1 flex flex-col w-full max-w-[768px] mx-auto h-[calc(100vh-56px-56px)] pt-sm pb-2 overflow-hidden">
      <ChatClientApp initialMessages={initialMessages} userId={userId} />
    </main>
  );
}
