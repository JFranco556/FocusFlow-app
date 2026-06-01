"use client";

import { useTransition } from "react";
import { toggleTaskCompletion } from "@/app/actions/taskActions";

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isUrgent: boolean;
  dueDate?: string;
}

export default function TaskCard({ id, title, description, isCompleted, isUrgent, dueDate }: TaskCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTaskCompletion(id, !isCompleted);
    });
  };

  const formattedTime = dueDate
    ? new Date(dueDate).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div
      className={`bg-[#131b2e] rounded-lg p-md flex gap-md items-start shadow-[0px_4px_12px_rgba(15,23,42,0.04)] border-l-4 relative overflow-hidden group ${
        isUrgent ? "border-l-urgent-red" : "border-l-secondary"
      } ${isCompleted ? "opacity-60" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
      
      <button
        onClick={handleToggle}
        disabled={isPending}
        className={`mt-1 w-5 h-5 rounded-sm border flex items-center justify-center transition-colors shrink-0 ${
          isCompleted
            ? "bg-secondary border-secondary text-on-secondary"
            : "border-outline-variant text-transparent hover:border-secondary hover:text-secondary"
        }`}
      >
        <span className="material-symbols-outlined text-[16px]">check</span>
      </button>
      
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <h4 className={`font-label-md text-label-md text-on-surface ${isCompleted ? "line-through text-on-surface-variant" : ""}`}>
            {title}
          </h4>
          {formattedTime && (
            <span
              className={`font-label-sm text-label-sm flex items-center gap-1 ${
                isUrgent && !isCompleted ? "text-urgent-red" : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">schedule</span> {formattedTime}
            </span>
          )}
        </div>
        {description && (
          <p className="font-body-md text-body-md text-on-surface-variant">{description}</p>
        )}
      </div>
    </div>
  );
}
