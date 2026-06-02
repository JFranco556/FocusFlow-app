"use client";

import { useState } from "react";
import { createTask } from "@/app/actions/taskActions";

interface AddTaskModalProps {
  userId: string;
  onClose: () => void;
}

export default function AddTaskModal({ userId, onClose }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    await createTask(userId, {
      title,
      description,
      isUrgent,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });
    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-md rounded-2xl p-6 shadow-xl border border-outline-variant/20 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-sm font-semibold text-on-surface">Nueva Tarea</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-label-md font-medium text-on-surface-variant mb-1">Título</label>
            <input 
              required
              autoFocus
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-body-md focus:outline-none focus:border-secondary"
              placeholder="Ej. Estudiar para el examen..."
            />
          </div>

          <div>
            <label className="block text-label-md font-medium text-on-surface-variant mb-1">Descripción (Opcional)</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-body-md focus:outline-none focus:border-secondary min-h-[80px]"
              placeholder="Detalles de la tarea..."
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-label-md font-medium text-on-surface-variant mb-1">Fecha Límite</label>
              <input 
                type="datetime-local" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-body-sm focus:outline-none focus:border-secondary"
              />
            </div>
            
            <div className="flex items-center gap-2 pt-6">
              <input 
                type="checkbox" 
                id="urgent"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-5 h-5 accent-urgent-red"
              />
              <label htmlFor="urgent" className="text-body-md font-medium text-urgent-red">¡Urgente!</label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !title.trim()}
            className="w-full mt-6 bg-secondary text-on-secondary py-3 rounded-full font-label-md font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Guardando..." : "Crear Tarea"}
          </button>
        </form>
      </div>
    </div>
  );
}
