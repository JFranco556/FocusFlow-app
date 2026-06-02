"use client";

import { useState } from "react";
import { createScheduleItem } from "@/app/actions/scheduleActions";

interface Props {
  userId: string;
  onClose: () => void;
}

export default function AddScheduleModal({ userId, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  // Por defecto el día de hoy
  const [dayOfWeek, setDayOfWeek] = useState(new Date().getDay());
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startTime || !endTime) return;

    setIsLoading(true);
    await createScheduleItem(userId, {
      title,
      startTime,
      endTime,
      dayOfWeek: Number(dayOfWeek),
    });
    setIsLoading(false);
    onClose();
  };

  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-md rounded-2xl p-6 shadow-xl border border-outline-variant/20 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-sm font-semibold text-on-surface">Nuevo Bloque</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-label-md font-medium text-on-surface-variant mb-1">Título de la Clase/Bloque</label>
            <input 
              required
              autoFocus
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-body-md focus:outline-none focus:border-tertiary"
              placeholder="Ej. Clase de Matemáticas..."
            />
          </div>

          <div>
            <label className="block text-label-md font-medium text-on-surface-variant mb-1">Día de la semana</label>
            <select
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(Number(e.target.value))}
              className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-body-md focus:outline-none focus:border-tertiary"
            >
              {days.map((day, idx) => (
                <option key={idx} value={idx}>{day}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-label-md font-medium text-on-surface-variant mb-1">Hora Inicio</label>
              <input 
                required
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-body-md focus:outline-none focus:border-tertiary"
              />
            </div>
            
            <div className="flex-1">
              <label className="block text-label-md font-medium text-on-surface-variant mb-1">Hora Fin</label>
              <input 
                required
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-4 py-2 text-body-md focus:outline-none focus:border-tertiary"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !title.trim() || !startTime || !endTime}
            className="w-full mt-6 bg-tertiary text-on-tertiary py-3 rounded-full font-label-md font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Guardando..." : "Crear Bloque"}
          </button>
        </form>
      </div>
    </div>
  );
}
