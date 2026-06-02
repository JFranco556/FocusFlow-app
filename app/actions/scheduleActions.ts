"use server";

import connectToDatabase from "@/lib/mongodb";
import { ScheduleItem } from "@/lib/models/ScheduleItem";
import { revalidatePath } from "next/cache";

export async function createScheduleItem(userId: string, data: { 
  title: string, 
  startTime: string, 
  endTime: string, 
  dayOfWeek: number 
}) {
  try {
    await connectToDatabase();
    await ScheduleItem.create({
      userId,
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      dayOfWeek: data.dayOfWeek,
      category: "Class"
    });
    
    revalidatePath("/schedule");
    return { success: true };
  } catch (error) {
    console.error("Error creating schedule item:", error);
    return { success: false, error: "Failed to create schedule item" };
  }
}

export async function deleteScheduleItem(itemId: string) {
  try {
    await connectToDatabase();
    await ScheduleItem.findByIdAndDelete(itemId);
    
    revalidatePath("/schedule");
    return { success: true };
  } catch (error) {
    console.error("Error deleting schedule item:", error);
    return { success: false, error: "Failed to delete schedule item" };
  }
}
