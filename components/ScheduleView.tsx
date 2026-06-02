"use client";

import { useState, useEffect } from "react";
import FloatingActionButton from "@/components/FloatingActionButton";

interface ScheduleViewProps {
  userId: string;
  scheduleItems: any[];
  tasks: any[];
}

type ViewMode = "daily" | "weekly" | "monthly";

function timeToPixels(timeStr: string) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours * 60) + minutes;
}

function dateToPixels(date: Date | string) {
  if (!date) return 0;
  const d = new Date(date);
  return (d.getHours() * 60) + d.getMinutes();
}

const COLOR_MAP: Record<string, string> = {
  blue: "bg-blue-500/20 border-blue-500 text-blue-400",
  red: "bg-red-500/20 border-red-500 text-red-400",
  green: "bg-green-500/20 border-green-500 text-green-400",
  purple: "bg-purple-500/20 border-purple-500 text-purple-400",
  orange: "bg-orange-500/20 border-orange-500 text-orange-400",
  default: "bg-tertiary-container/90 border-tertiary text-tertiary",
};

export default function ScheduleView({ userId, scheduleItems, tasks }: ScheduleViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("weekly");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTimePixels, setCurrentTimePixels] = useState(0);

  // Actualizar la línea de tiempo real cada minuto
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimePixels((now.getHours() * 60) + now.getMinutes());
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Utilidades de fechas
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day; // Domingo como inicio de la semana
    return new Date(d.setDate(diff));
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  const hoursList = Array.from({ length: 24 }, (_, i) => i);
  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  // Navegación
  const next = () => {
    const d = new Date(currentDate);
    if (viewMode === "daily") d.setDate(d.getDate() + 1);
    if (viewMode === "weekly") d.setDate(d.getDate() + 7);
    if (viewMode === "monthly") d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  const prev = () => {
    const d = new Date(currentDate);
    if (viewMode === "daily") d.setDate(d.getDate() - 1);
    if (viewMode === "weekly") d.setDate(d.getDate() - 7);
    if (viewMode === "monthly") d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };

  // Renderizado del Header de la Vista Semanal
  const renderWeeklyHeader = () => (
    <div className="flex border-b border-outline-variant/20 sticky top-0 bg-surface z-20 pt-2 pb-2">
      <div className="w-12 shrink-0"></div> {/* Espacio para las horas */}
      <div className="flex-1 grid grid-cols-7 gap-px">
        {weekDays.map((day, idx) => {
          const isToday = new Date().toDateString() === day.toDateString();
          return (
            <div key={idx} className="flex flex-col items-center justify-center">
              <span className={`text-label-sm ${isToday ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>
                {dayNames[day.getDay()]}
              </span>
              <span className={`text-title-md mt-1 w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-secondary text-on-secondary' : 'text-on-surface'}`}>
                {day.getDate()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Renderizado del Cuerpo de la Vista Semanal
  const renderWeeklyGrid = () => (
    <div className="relative min-h-[1440px] flex">
      {/* Columna de Horas */}
      <div className="w-12 shrink-0 border-r border-outline-variant/20 relative">
        {hoursList.map((hour) => (
          <div key={hour} className="absolute w-full pr-2 text-right font-label-sm text-outline-variant" style={{ top: `${hour * 60 - 10}px` }}>
            {hour === 0 ? '' : `${hour} ${hour < 12 ? 'AM' : 'PM'}`}
          </div>
        ))}
      </div>

      {/* Columnas de los 7 Días */}
      <div className="flex-1 grid grid-cols-7 divide-x divide-outline-variant/20 relative">
        {/* Líneas horizontales de las horas (fondo) */}
        <div className="absolute inset-0 pointer-events-none">
          {hoursList.map(hour => (
            <div key={hour} className="w-full border-t border-outline-variant/10" style={{ height: '60px' }}></div>
          ))}
        </div>

        {/* Línea de tiempo real (si es la semana actual) */}
        {weekDays.some(d => d.toDateString() === new Date().toDateString()) && (
          <div 
            className="absolute left-0 right-0 border-t-2 border-urgent-red z-20 pointer-events-none flex items-center"
            style={{ top: `${currentTimePixels}px` }}
          >
            <div className="w-2 h-2 rounded-full bg-urgent-red absolute -left-1"></div>
          </div>
        )}

        {/* Columnas individuales para colocar los bloques */}
        {weekDays.map((day, colIdx) => {
          const dayOfWeek = day.getDay();
          const dayTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate).toDateString() === day.toDateString());
          const dayBlocks = scheduleItems.filter(b => b.dayOfWeek === dayOfWeek);

          return (
            <div key={colIdx} className="relative h-full">
              {/* Bloques */}
              {dayBlocks.map(block => {
                const top = timeToPixels(block.startTime);
                const height = timeToPixels(block.endTime) - top;
                const colorClasses = COLOR_MAP[block.color] || COLOR_MAP.default;
                return (
                  <div 
                    key={block._id}
                    className={`absolute left-1 right-1 border rounded p-1 overflow-hidden hover:opacity-100 opacity-90 transition-opacity cursor-pointer z-10 shadow-sm ${colorClasses}`}
                    style={{ top: `${top}px`, height: `${height}px` }}
                  >
                    <div className="font-label-sm font-semibold truncate leading-tight">{block.title}</div>
                    <div className="text-[10px] opacity-80 truncate">{block.startTime}</div>
                  </div>
                );
              })}

              {/* Tareas */}
              {dayTasks.map(task => {
                const top = dateToPixels(task.dueDate);
                return (
                  <div 
                    key={task._id}
                    className={`absolute left-1 right-1 h-[30px] rounded p-1 border-l-4 flex items-center shadow-sm z-10 cursor-pointer overflow-hidden ${task.isUrgent ? 'bg-urgent-red/20 border-urgent-red text-urgent-red' : 'bg-secondary-container border-secondary text-on-secondary-container'}`}
                    style={{ top: `${top}px` }}
                  >
                    <span className="text-[11px] font-semibold truncate">{task.title}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );

  // --- RENDERIZADO VISTA DIARIA ---
  const renderDailyGrid = () => {
    const dayTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate).toDateString() === currentDate.toDateString());
    const dayBlocks = scheduleItems.filter(b => b.dayOfWeek === currentDate.getDay());
    const isToday = new Date().toDateString() === currentDate.toDateString();

    return (
      <div className="relative min-h-[1440px] flex">
        <div className="w-14 shrink-0 border-r border-outline-variant/20 relative">
          {hoursList.map((hour) => (
            <div key={hour} className="absolute w-full pr-2 text-right font-label-sm text-outline-variant" style={{ top: `${hour * 60 - 10}px` }}>
              {hour === 0 ? '' : `${hour} ${hour < 12 ? 'AM' : 'PM'}`}
            </div>
          ))}
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 pointer-events-none">
            {hoursList.map(hour => (
              <div key={hour} className="w-full border-t border-outline-variant/10" style={{ height: '60px' }}></div>
            ))}
          </div>
          
          {isToday && (
            <div className="absolute left-0 right-0 border-t-2 border-urgent-red z-20 pointer-events-none flex items-center" style={{ top: `${currentTimePixels}px` }}>
              <div className="w-3 h-3 rounded-full bg-urgent-red absolute -left-1.5"></div>
            </div>
          )}

          {dayBlocks.map(block => {
            const top = timeToPixels(block.startTime);
            const height = timeToPixels(block.endTime) - top;
            const colorClasses = COLOR_MAP[block.color] || COLOR_MAP.default;
            return (
              <div key={block._id} className={`absolute left-2 right-4 border rounded-lg p-2 hover:opacity-100 opacity-90 transition-opacity shadow-sm z-10 ${colorClasses}`} style={{ top: `${top}px`, height: `${height}px` }}>
                <div className="font-label-sm font-bold">{block.title}</div>
                <div className="text-xs opacity-80">{block.startTime} - {block.endTime}</div>
              </div>
            );
          })}

          {dayTasks.map(task => {
            const top = dateToPixels(task.dueDate);
            return (
              <div key={task._id} className={`absolute left-2 right-12 h-[45px] rounded-lg p-2 border-l-4 flex items-center shadow-sm z-10 ${task.isUrgent ? 'bg-urgent-red/10 border-urgent-red text-urgent-red' : 'bg-secondary-container border-secondary text-on-secondary-container'}`} style={{ top: `${top}px` }}>
                <span className="text-sm font-semibold truncate">{task.title}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // --- RENDERIZADO VISTA MENSUAL ---
  const renderMonthlyGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Rellenar días en blanco antes del inicio del mes
    const blanks = Array.from({ length: firstDay }, (_, i) => i);
    const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
      <div className="w-full flex flex-col h-full bg-surface">
        <div className="grid grid-cols-7 border-b border-outline-variant/20 pb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center font-label-sm text-on-surface-variant py-2">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 flex-1 auto-rows-fr gap-px bg-outline-variant/10">
          {blanks.map(b => <div key={`blank-${b}`} className="bg-surface"></div>)}
          {monthDays.map(day => {
            const thisDate = new Date(year, month, day);
            const isToday = new Date().toDateString() === thisDate.toDateString();
            const dayTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate).toDateString() === thisDate.toDateString());
            const dayBlocks = scheduleItems.filter(b => b.dayOfWeek === thisDate.getDay());
            
            return (
              <div 
                key={day} 
                className="bg-surface p-1 hover:bg-surface-variant/30 cursor-pointer transition-colors border-b border-r border-outline-variant/10 relative min-h-[80px]"
                onClick={() => {
                  setCurrentDate(thisDate);
                  setViewMode("daily");
                }}
              >
                <div className={`w-6 h-6 flex items-center justify-center rounded-full text-label-sm mb-1 ${isToday ? 'bg-secondary text-on-secondary font-bold mx-auto' : 'text-on-surface mx-auto'}`}>
                  {day}
                </div>
                <div className="flex flex-col gap-1 px-1">
                  {dayBlocks.length > 0 && (
                    <div className="w-full h-1.5 bg-tertiary rounded-full"></div>
                  )}
                  {dayTasks.length > 0 && (
                    <div className="w-full h-1.5 bg-secondary rounded-full"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header Controles */}
      <section className="px-margin-mobile md:px-0 py-sm flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <button onClick={prev} className="p-2 text-on-surface-variant hover:text-secondary active:scale-95">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h2 className="font-headline-sm font-bold text-on-surface min-w-[120px] text-center capitalize">
            {viewMode === "daily" && currentDate.toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
            {viewMode !== "daily" && currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </h2>
          <button onClick={next} className="p-2 text-on-surface-variant hover:text-secondary active:scale-95">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <div className="flex bg-surface-variant rounded-lg p-1 scale-90 sm:scale-100">
          <button onClick={() => setViewMode("daily")} className={`px-2 py-1 rounded-md text-label-sm font-medium transition-colors ${viewMode === "daily" ? 'bg-secondary text-on-secondary shadow' : 'text-on-surface-variant hover:text-on-surface'}`}>Día</button>
          <button onClick={() => setViewMode("weekly")} className={`px-2 py-1 rounded-md text-label-sm font-medium transition-colors ${viewMode === "weekly" ? 'bg-secondary text-on-secondary shadow' : 'text-on-surface-variant hover:text-on-surface'}`}>Semana</button>
          <button onClick={() => setViewMode("monthly")} className={`px-2 py-1 rounded-md text-label-sm font-medium transition-colors ${viewMode === "monthly" ? 'bg-secondary text-on-secondary shadow' : 'text-on-surface-variant hover:text-on-surface'}`}>Mes</button>
        </div>
      </section>

      {/* Grid Scrollable */}
      <section className="flex-1 overflow-y-auto hide-scrollbar relative">
        {viewMode === "weekly" && (
          <div className="w-full min-w-[600px]">
            {renderWeeklyHeader()}
            {renderWeeklyGrid()}
          </div>
        )}

        {viewMode === "daily" && (
          <div className="w-full">
            {renderDailyGrid()}
          </div>
        )}

        {viewMode === "monthly" && (
          <div className="w-full h-full min-w-[300px]">
            {renderMonthlyGrid()}
          </div>
        )}
      </section>

      <FloatingActionButton userId={userId} type="schedule" />
    </div>
  );
}
