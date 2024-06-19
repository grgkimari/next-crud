import { ITask } from "@/types";
import DueDate from "./DueDate";

export default function TaskItem({ task }: { task: ITask }) {
    return (
        <div className="w-[90%] flex min-h-20 rounded-lg gap-12 p-3 items-center border-2">
            <input type="checkbox" title="Done" className="text-blue-500" />
            <p className="text-black text-3xl">{task.title}</p>
            {task.dueDate ? <DueDate dueDate={task.dueDate} /> : null}
            <div className="flex-grow" />
            <div className="flex items-end">
                <button type="button" title="Edit task" className="w-12 h-8 bg-transparent text-blue-500 ">Edit</button>
            </div>
        </div>
    );
}
