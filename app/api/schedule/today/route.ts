import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import { ScheduleItem } from "@/lib/models/ScheduleItem";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const userId = (session.user as any).id || session.user.email;

    await connectToDatabase();
    
    const currentDayOfWeek = new Date().getDay();
    const items = await ScheduleItem.find({ userId, dayOfWeek: currentDayOfWeek }).lean();

    return NextResponse.json({ items });
  } catch (error: any) {
    console.error("Error fetching today's schedule:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
