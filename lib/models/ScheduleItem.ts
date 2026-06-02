import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScheduleItem extends Document {
  userId: string;
  title: string;
  category: "Work" | "Study" | "Personal" | "Class";
  startTime: string; // HH:mm format
  endTime: string;   // HH:mm format
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  color?: string; // color name
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ScheduleItemSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    category: { type: String, enum: ["Work", "Study", "Personal", "Class"], default: "Study" },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    color: { type: String, default: "default" },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ScheduleItem: Model<IScheduleItem> = 
  mongoose.models.ScheduleItem || mongoose.model<IScheduleItem>("ScheduleItem", ScheduleItemSchema);
