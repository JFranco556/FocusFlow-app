import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import { Task } from "@/lib/models/Task";
import { ScheduleItem } from "@/lib/models/ScheduleItem";
import ScheduleView from "@/components/ScheduleView";

export default async function SchedulePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/login");
  }

  await connectToDatabase();
  const userId = (session.user as any).id || session.user.email;

  // Obtener TODOS los bloques de horario fijos del usuario
  const scheduleItemsRaw = await ScheduleItem.find({ userId }).lean();
  const scheduleItems = JSON.parse(JSON.stringify(scheduleItemsRaw));
  
  // Obtener TODAS las tareas pendientes con fecha límite
  const pendingTasksRaw = await Task.find({ 
    userId, 
    isCompleted: false,
    dueDate: { $ne: null }
  }).lean();
  const tasks = JSON.parse(JSON.stringify(pendingTasksRaw));

  return (
    <main className="flex-1 flex flex-col w-full max-w-[1024px] mx-auto md:px-margin-mobile h-screen pt-lg pb-[60px]">
      <ScheduleView 
        userId={userId} 
        scheduleItems={scheduleItems} 
        tasks={tasks} 
      />
    </main>
  );
}
