import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITask extends Document {
  userId: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isUrgent: boolean;
  dueDate?: Date;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    isUrgent: { type: Boolean, default: false },
    dueDate: { type: Date },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// If the model is already compiled in mongoose, use it. Otherwise, compile it.
export const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
