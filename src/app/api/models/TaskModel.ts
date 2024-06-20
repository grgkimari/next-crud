import { ITask } from "@/types";
import mongoose, { Schema } from "mongoose";
import { title } from "process";

const TaskSchema = new Schema<ITask>({
    title : String,
    description : {
        type : String,
        default : ""},
    dueDate : {
        type : Date || null,
        default : null
    },
    completed : {
        type : Boolean,
        default : false
    }
})

export default mongoose.models.Task || mongoose.model("Task", TaskSchema)