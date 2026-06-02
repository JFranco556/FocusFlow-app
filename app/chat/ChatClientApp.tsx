"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatClientApp({ initialMessages, userId }: { initialMessages: any[], userId: string }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al fondo cuando hay un nuevo mensaje
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: "user", content: input, id: Date.now().toString() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: "model", content: data.text, id: Date.now().toString() }]);
      }
    } catch (error) {
      console.error("Error al enviar mensaje", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative px-margin-mobile">
      
      {/* Mensaje de Bienvenida si no hay historial */}
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center opacity-80 pb-10">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-secondary mb-4 shadow-sm border border-outline-variant/10">
            <span className="material-symbols-outlined text-[32px]">smart_toy</span>
          </div>
          <h2 className="font-headline-sm text-on-surface mb-2">¡Hola! Soy FlowAI</h2>
          <p className="font-body-md text-on-surface-variant max-w-[250px]">
            Tu asistente académico personal. ¿En qué te puedo ayudar hoy a organizarte?
          </p>
        </div>
      )}

      {/* Lista de Mensajes */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pb-[80px] pt-4 hide-scrollbar">
        {messages.map((msg, i) => (
          <div key={msg.id || i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
              msg.role === 'user' 
                ? 'bg-secondary text-on-secondary rounded-tr-sm' 
                : 'bg-surface-container text-on-surface border border-outline-variant/20 rounded-tl-sm'
            }`}>
              <p className="font-body-md whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-surface-container text-on-surface border border-outline-variant/20 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-1">
              <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
              <div className="w-2 h-2 bg-on-surface-variant/50 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Input de Chat */}
      <div className="absolute bottom-0 left-0 w-full bg-background/80 backdrop-blur-md pt-2 pb-6 px-margin-mobile">
        <form onSubmit={sendMessage} className="relative w-full max-w-[768px] mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe a FlowAI..."
            className="w-full bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 font-body-md border border-outline-variant/30 rounded-full py-3.5 pl-5 pr-14 shadow-[0px_4px_12px_rgba(15,23,42,0.04)] focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-1 top-1 bottom-1 aspect-square bg-secondary text-on-secondary rounded-full flex items-center justify-center hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50 disabled:active:scale-100"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
