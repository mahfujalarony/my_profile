import mongoose, { Schema, Document } from "mongoose";

export interface IVisitor extends Document {
  ip: string;
  userAgent: string;
  referer: string;
  language?: string;
  device?: string;
  timezone?: string;
  visitedAt: Date;
  count: number;
}

const VisitorSchema: Schema<IVisitor> = new Schema({
  ip: { type: String, required: true, unique: true }, 
  userAgent: { type: String, required: true },
  referer: { type: String, default: "" },
  language: { type: String, default: "" },
  device: { type: String, default: "" },
  timezone: { type: String, default: "" },
  visitedAt: { type: Date, default: Date.now },
  count: { type: Number, default: 1 }, 
});


const VisitorModel =
  mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);

export default VisitorModel;
