import mongoose, { Schema, Document, Model } from "mongoose";

export interface IChatMessage extends Document {
  userId: string;
  role: "user" | "model";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    role: { type: String, enum: ["user", "model"], required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ChatMessage: Model<IChatMessage> = 
  mongoose.models.ChatMessage || mongoose.model<IChatMessage>("ChatMessage", ChatMessageSchema);
