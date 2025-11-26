import mongoose, { Schema, Document } from "mongoose";
import { postData, postDataInput } from "@/app/types/postType";

interface IPost extends postDataInput, Document {}

const PostSchema: Schema = new Schema<IPost>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  view: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  image: { type: String, default: null },
});


export default mongoose.models.Posts ||
  mongoose.model<IPost>("Posts", PostSchema);
