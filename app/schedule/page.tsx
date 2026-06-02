import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Task } from "@/lib/models/Task";
import { ScheduleItem } from "@/lib/models/ScheduleItem";
import FloatingActionButton from "@/components/FloatingActionButton";

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);
  
  // Si no hay sesión, el middleware lo debió bloquear, pero por seguridad:
  if (!session || !session.user) {
    redirect("/login");
  }

  // Obtener tareas y horario del usuario actual
  await connectToDatabase();
  const userId = (session.user as any).id || session.user.email; // Fallback al email si no hay sub

  // Obtener ScheduleItems fijos
  const scheduleItems = await ScheduleItem.find({ userId }).lean();
  
  // Obtener Tareas pendientes
  const pendingTasks = await Task.find({ userId, isCompleted: false }).lean();

  return (
    <main className="flex-1 flex flex-col w-full max-w-[768px] mx-auto md:px-margin-mobile pt-lg pb-[100px]">
      <section className="px-margin-mobile md:px-0 py-md mb-md">
        <h2 className="font-display-lg text-display-lg text-on-surface">Tu Horario</h2>
        <p className="font-body-lg text-on-surface-variant">Visualiza tus clases y tareas pendientes en un solo lugar.</p>
      </section>

      {/* Control de vista de días (simplificado para MVP) */}
      <section className="px-margin-mobile md:px-0 py-md border-b border-outline-variant/20 mb-md">
        <div className="flex justify-between items-center bg-surface-container rounded-lg p-sm shadow-[0px_4px_12px_rgba(15,23,42,0.04)]">
          <div className="flex flex-col items-center justify-center w-11 h-14 rounded-md bg-secondary text-on-secondary shadow-sm">
            <span className="font-label-sm uppercase opacity-90">Hoy</span>
          </div>
          {/* Aquí irían los demás días interactivos */}
        </div>
      </section>

      {/* Grid de tiempo (ficticio para demostración inicial) */}
      <section className="flex-1 overflow-y-auto relative mt-sm px-margin-mobile md:px-0">
        <div className="relative min-h-[600px]">
          
          {/* 09:00 AM */}
          <div className="flex relative h-[80px]">
            <div className="w-14 flex-shrink-0 font-label-md text-outline-variant pt-2 text-right pr-sm">09 AM</div>
            <div className="flex-1 border-t border-outline-variant/20 relative"></div>
          </div>
          
          {/* 10:00 AM */}
          <div className="flex relative h-[80px]">
            <div className="w-14 flex-shrink-0 font-label-md text-outline-variant pt-2 text-right pr-sm">10 AM</div>
            <div className="flex-1 border-t border-outline-variant/20 relative">
              {/* Ejemplo de ScheduleItem Fijo (Clase) */}
              <div className="absolute top-[10px] left-2 right-2 h-[100px] bg-tertiary-container/80 border border-tertiary rounded-lg p-sm shadow-sm flex flex-col">
                <span className="font-label-sm font-bold text-tertiary">Estudio / Clase</span>
                <h4 className="font-body-md font-semibold text-on-surface">Diseño de Interfaces</h4>
                <span className="font-label-sm text-on-surface-variant mt-auto">10:15 AM - 11:45 AM</span>
              </div>
            </div>
          </div>

          {/* 11:00 AM */}
          <div className="flex relative h-[80px]">
            <div className="w-14 flex-shrink-0 font-label-md text-outline-variant pt-2 pr-sm text-right">11 AM</div>
            <div className="flex-1 border-t border-outline-variant/20 relative"></div>
          </div>

          {/* 12:00 PM */}
          <div className="flex relative h-[80px]">
            <div className="w-14 flex-shrink-0 font-label-md text-outline-variant pt-2 pr-sm text-right">12 PM</div>
            <div className="flex-1 border-t border-outline-variant/20 relative">
              {/* Ejemplo de Task superpuesta en el horario */}
              <div className="absolute top-[30px] left-2 right-2 h-[45px] bg-secondary-container border-l-4 border-l-secondary rounded-lg p-sm shadow-sm flex items-center justify-between">
                <h4 className="font-body-md font-semibold text-on-secondary-container">Tarea: Revisar correos</h4>
                <span className="font-label-sm text-on-secondary-container/80">Fecha límite: 12:30 PM</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <FloatingActionButton userId={userId} />
    </main>
  );
}
