"use server";

import connectToDatabase from "@/lib/mongodb";
import { Task } from "@/lib/models/Task";
import { revalidatePath } from "next/cache";

/**
 * Obtener todas las tareas de la base de datos
 */
export async function getTasks(userId: string) {
  try {
    await connectToDatabase();
    // Fetch all tasks, sorted by urgency and then by creation date
    const tasks = await Task.find({ userId }).sort({ isUrgent: -1, createdAt: -1 }).lean();
    
    // We need to stringify IDs because plain objects are required in Server Components
    return JSON.parse(JSON.stringify(tasks));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

/**
 * Alternar el estado de completado de una tarea
 */
export async function toggleTaskCompletion(taskId: string, isCompleted: boolean) {
  try {
    await connectToDatabase();
    await Task.findByIdAndUpdate(taskId, { isCompleted });
    
    // Revalidate the dashboard page so it shows the new state
    revalidatePath("/");
    revalidatePath("/tasks");
    revalidatePath("/schedule");
    return { success: true };
  } catch (error) {
    console.error("Error toggling task:", error);
    return { success: false, error: "Failed to toggle task" };
  }
}

/**
 * Crear una nueva tarea de prueba (Seed)
 */
export async function createTestTasks(userId: string) {
  try {
    await connectToDatabase();
    
    const count = await Task.countDocuments({ userId });
    if (count === 0) {
      await Task.create([
        {
          userId,
          title: "Revisión de Presupuesto Q3",
          description: "Aprobar las partidas finales con el equipo de finanzas antes de la junta directiva.",
          isUrgent: true,
          dueDate: new Date(new Date().setHours(10, 0, 0, 0)),
        },
        {
          userId,
          title: "Feedback Diseño UI",
          description: "Enviar comentarios sobre los nuevos componentes compartidos al equipo de desarrollo.",
          isUrgent: false,
          dueDate: new Date(new Date().setHours(14, 30, 0, 0)),
        }
      ]);
      revalidatePath("/");
      return { success: true, message: "Tareas de prueba creadas." };
    }
    return { success: true, message: "Ya existen tareas." };
  } catch (error) {
    console.error("Error creating test tasks:", error);
    return { success: false, error: "Failed to seed tasks" };
  }
}

/**
 * Crear una nueva tarea
 */
export async function createTask(userId: string, data: { title: string, description?: string, isUrgent: boolean, dueDate?: Date }) {
  try {
    await connectToDatabase();
    await Task.create({
      userId,
      title: data.title,
      description: data.description,
      isUrgent: data.isUrgent,
      dueDate: data.dueDate,
    });
    
    revalidatePath("/");
    revalidatePath("/tasks");
    revalidatePath("/schedule");
    return { success: true };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: "Failed to create task" };
  }
}

/**
 * Eliminar una tarea
 */
export async function deleteTask(taskId: string) {
  try {
    await connectToDatabase();
    await Task.findByIdAndDelete(taskId);
    
    revalidatePath("/");
    revalidatePath("/tasks");
    revalidatePath("/schedule");
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: "Failed to delete task" };
  }
}
