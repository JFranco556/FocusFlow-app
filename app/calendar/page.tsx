import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Task } from "@/lib/models/Task";

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id || session.user.email;
  await connectToDatabase();

  // Obtener tareas con fecha límite (entregas)
  const assignmentsRaw = await Task.find({ 
    userId, 
    dueDate: { $exists: true, $ne: null },
    isCompleted: false 
  }).sort({ dueDate: 1 }).lean();
  
  const assignments = JSON.parse(JSON.stringify(assignmentsRaw));

  return (
    <main className="flex-1 flex flex-col w-full max-w-[768px] mx-auto md:px-margin-mobile pt-lg pb-[100px] space-y-lg">
      
      {/* Calendar Header */}
      <section className="px-margin-mobile md:px-0 flex justify-between items-center">
        <h2 className="font-display-lg text-display-lg text-on-surface">Calendario</h2>
        <div className="flex bg-surface-container rounded-lg p-1">
          <button className="px-3 py-1 bg-secondary text-on-secondary rounded-md font-label-md shadow-sm">
            Mensual
          </button>
          <button className="px-3 py-1 text-on-surface-variant font-label-md hover:bg-surface-variant/50 rounded-md transition-colors">
            Semanal
          </button>
        </div>
      </section>

      {/* Contenedor del Calendario Visual (Estático por ahora) */}
      <section className="px-margin-mobile md:px-0">
        <div className="w-full bg-surface-container rounded-xl border border-outline-variant/30 shadow-[0px_4px_12px_rgba(0,0,0,0.04)] p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline-sm font-semibold">Noviembre 2023</h3>
            <div className="flex gap-2">
              <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">chevron_left</button>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors">chevron_right</button>
            </div>
          </div>
          {/* Grid de días simplificado */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {['D','L','M','X','J','V','S'].map(day => (
              <div key={day} className="font-label-sm text-on-surface-variant font-bold">{day}</div>
            ))}
            {/* Casillas vacías */}
            <div className="aspect-square"></div>
            <div className="aspect-square"></div>
            {/* Días del mes */}
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(day => (
              <div key={day} className={`aspect-square flex items-center justify-center rounded-full font-body-md ${day === 5 ? 'bg-secondary text-on-secondary font-bold shadow-md' : 'hover:bg-surface-variant cursor-pointer text-on-surface'}`}>
                {day}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Assignments */}
      <section className="px-margin-mobile md:px-0 flex flex-col gap-md">
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold border-b border-outline-variant/20 pb-2">
          Próximas Entregas
        </h3>
        <div className="flex flex-col gap-3">
          {assignments.length > 0 ? (
            assignments.map((assignment: any) => (
              <article key={assignment._id} className="relative bg-surface-container rounded-xl border border-outline-variant/30 shadow-sm p-md pl-5 flex flex-col gap-sm overflow-hidden group">
                <div className={`absolute left-0 top-0 bottom-0 w-[4px] ${assignment.isUrgent ? 'bg-urgent-red' : 'bg-secondary'}`}></div>
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-headline-sm text-headline-sm text-on-surface leading-tight">{assignment.title}</h4>
                    {assignment.description && <p className="font-body-md text-body-md text-on-surface-variant mt-1">{assignment.description}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1 pt-3 border-t border-outline-variant/20">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">schedule</span>
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {new Date(assignment.dueDate).toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </article>
            ))
          ) : (
            <p className="text-on-surface-variant py-2">No hay entregas próximas programadas.</p>
          )}
        </div>
      </section>
    </main>
  );
}
