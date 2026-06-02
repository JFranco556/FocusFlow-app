import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Task } from "@/lib/models/Task";
import TaskCard from "@/components/TaskCard";

export default async function TasksPage() {
  const session = await getServerSession();
  
  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = (session.user as any).id || session.user.email;
  await connectToDatabase();

  // Obtener todas las tareas del usuario
  const tasksRaw = await Task.find({ userId }).sort({ createdAt: -1 }).lean();
  const tasks = JSON.parse(JSON.stringify(tasksRaw));

  const pendingTasks = tasks.filter((t: any) => !t.isCompleted);
  const completedTasks = tasks.filter((t: any) => t.isCompleted);

  return (
    <main className="flex-1 flex flex-col w-full max-w-[768px] mx-auto md:px-margin-mobile pt-lg pb-[100px] space-y-xl">
      <section className="px-margin-mobile md:px-0 flex justify-between items-end">
        <div>
          <h2 className="font-display-lg text-display-lg text-on-surface">Mis Tareas</h2>
          <p className="font-body-lg text-on-surface-variant">Tienes {pendingTasks.length} tareas pendientes.</p>
        </div>
        <button className="flex items-center gap-1 text-secondary font-label-md hover:opacity-80 transition-opacity">
          <span className="material-symbols-outlined text-[18px]">filter_list</span> Filtrar
        </button>
      </section>

      {/* Tareas Pendientes */}
      <section className="px-margin-mobile md:px-0 space-y-md">
        <h3 className="font-headline-md-mobile text-headline-md-mobile text-on-surface border-b border-outline-variant/20 pb-2">
          Pendientes
        </h3>
        <div className="space-y-sm">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task: any) => (
              <TaskCard 
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                isUrgent={task.isUrgent}
                dueDate={task.dueDate}
              />
            ))
          ) : (
            <p className="text-on-surface-variant text-center py-4">¡Todo al día! No tienes tareas pendientes.</p>
          )}
        </div>
      </section>

      {/* Tareas Completadas */}
      <section className="px-margin-mobile md:px-0 space-y-md opacity-80">
        <h3 className="font-headline-md-mobile text-headline-md-mobile text-on-surface border-b border-outline-variant/20 pb-2 flex justify-between items-center">
          Completadas
          <span className="text-body-md font-normal text-on-surface-variant">{completedTasks.length}</span>
        </h3>
        <div className="space-y-sm">
          {completedTasks.length > 0 ? (
            completedTasks.map((task: any) => (
              <TaskCard 
                key={task._id}
                id={task._id}
                title={task.title}
                description={task.description}
                isCompleted={task.isCompleted}
                isUrgent={task.isUrgent}
                dueDate={task.dueDate}
              />
            ))
          ) : (
            <p className="text-on-surface-variant text-center py-4">Aún no has completado tareas.</p>
          )}
        </div>
      </section>

      {/* Floating Action Button */}
      <button className="fixed bottom-[80px] right-margin-mobile w-14 h-14 bg-secondary text-on-secondary rounded-2xl shadow-lg flex items-center justify-center hover:opacity-90 transition-opacity active:scale-90 z-50">
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>
    </main>
  );
}
