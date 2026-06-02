import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Task } from "@/lib/models/Task";
import { ScheduleItem } from "@/lib/models/ScheduleItem";
import FloatingActionButton from "@/components/FloatingActionButton";

function timeToPixels(timeStr: string) {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return (hours * 60) + minutes; // 1px por minuto
}

function dateToPixels(date: Date) {
  if (!date) return 0;
  const d = new Date(date);
  return (d.getHours() * 60) + d.getMinutes();
}

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  await connectToDatabase();
  const userId = (session.user as any).id || session.user.email;

  // Fecha de hoy
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0-6 (Domingo a Sábado)
  
  // Rango para las tareas de hoy
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  // Obtener bloques de horario fijos del día actual
  const scheduleItemsRaw = await ScheduleItem.find({ userId, dayOfWeek: currentDayOfWeek }).lean();
  const scheduleItems = JSON.parse(JSON.stringify(scheduleItemsRaw));
  
  // Obtener tareas pendientes cuya fecha límite sea hoy
  const pendingTasksRaw = await Task.find({ 
    userId, 
    isCompleted: false,
    dueDate: { $gte: startOfDay, $lte: endOfDay }
  }).lean();
  const tasks = JSON.parse(JSON.stringify(pendingTasksRaw));

  // Array de 24 horas (0 a 23)
  const hoursList = Array.from({ length: 24 }, (_, i) => i);

  return (
    <main className="flex-1 flex flex-col w-full max-w-[768px] mx-auto md:px-margin-mobile pt-lg pb-[100px]">
      <section className="px-margin-mobile md:px-0 py-md mb-md">
        <h2 className="font-display-lg text-display-lg text-on-surface">Tu Horario</h2>
        <p className="font-body-lg text-on-surface-variant">
          Hoy tienes {scheduleItems.length} bloques y {tasks.length} tareas.
        </p>
      </section>

      {/* Control de vista de días (Hoy) */}
      <section className="px-margin-mobile md:px-0 py-md border-b border-outline-variant/20 mb-md">
        <div className="flex justify-between items-center bg-surface-container rounded-lg p-sm shadow-[0px_4px_12px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col items-center justify-center w-11 h-14 rounded-md bg-secondary text-on-secondary shadow-sm">
            <span className="font-label-sm uppercase opacity-90">Hoy</span>
          </div>
        </div>
      </section>

      {/* Cuadrícula de Tiempo Dinámica */}
      <section className="flex-1 overflow-y-auto relative mt-sm px-margin-mobile md:px-0 hide-scrollbar pb-10">
        <div className="relative min-h-[1440px]"> {/* 24h * 60px */}
          
          {/* Fondo: Líneas por cada hora */}
          {hoursList.map((hour) => (
            <div key={hour} className="flex relative h-[60px]">
              <div className="w-14 flex-shrink-0 font-label-md text-outline-variant pt-2 text-right pr-sm">
                {hour.toString().padStart(2, '0')}:00
              </div>
              <div className="flex-1 border-t border-outline-variant/20 relative"></div>
            </div>
          ))}

          {/* Renderizado de Bloques Fijos (ScheduleItems) */}
          <div className="absolute top-0 right-0 left-14 bottom-0 pointer-events-none">
            {scheduleItems.map((item: any) => {
              const top = timeToPixels(item.startTime);
              const bottom = timeToPixels(item.endTime);
              const height = bottom - top;

              return (
                <div 
                  key={item._id}
                  className="absolute left-2 right-2 bg-tertiary-container/80 border border-tertiary rounded-lg p-sm shadow-sm flex flex-col overflow-hidden pointer-events-auto hover:opacity-90 transition-opacity cursor-pointer"
                  style={{ top: `${top}px`, height: `${height}px` }}
                >
                  <span className="font-label-sm font-bold text-tertiary">{item.category}</span>
                  <h4 className="font-body-md font-semibold text-on-surface truncate">{item.title}</h4>
                  <span className="font-label-sm text-on-surface-variant mt-auto">
                    {item.startTime} - {item.endTime}
                  </span>
                </div>
              );
            })}

            {/* Renderizado de Tareas Programadas para hoy */}
            {tasks.map((task: any) => {
              if (!task.dueDate) return null;
              const top = dateToPixels(task.dueDate);
              
              return (
                <div 
                  key={task._id}
                  className={`absolute left-2 right-12 h-[45px] ${task.isUrgent ? 'bg-urgent-red/10 border-l-urgent-red' : 'bg-secondary-container border-l-secondary'} border-l-4 rounded-lg p-sm shadow-sm flex items-center justify-between pointer-events-auto hover:opacity-90 transition-opacity cursor-pointer z-10`}
                  style={{ top: `${top}px` }}
                >
                  <h4 className={`font-body-md font-semibold truncate pr-2 ${task.isUrgent ? 'text-urgent-red' : 'text-on-secondary-container'}`}>
                    {task.title}
                  </h4>
                  <span className={`font-label-sm whitespace-nowrap ${task.isUrgent ? 'text-urgent-red/80' : 'text-on-secondary-container/80'}`}>
                    {new Date(task.dueDate).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FAB configurado en modo "schedule" para crear bloques fijos */}
      <FloatingActionButton userId={userId} type="schedule" />
    </main>
  );
}
