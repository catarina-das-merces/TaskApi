import mongoose, { Schema } from "mongoose";
import { ITask } from "../types/interface";

const TaskSchema = new Schema<ITask>({
	title: { type: String, required: true },
	completed: { type: Boolean, default: false },
});

export default mongoose.model<ITask>("Task", TaskSchema);
