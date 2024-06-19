import { ITask } from "@/types";
import mongoose, { Schema } from "mongoose";
import { title } from "process";

const TaskSchema = new Schema<ITask>({
    title : String,
    description : String,
    dueDate : {
        type : Date || null,
        default : null
    },
    completed : Boolean
})

export default mongoose.models.Task || mongoose.model("Task", TaskSchema)