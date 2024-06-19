import { ITask } from "@/types";
import TaskItem from "./TaskItem";

export default function TaskList({tasks} : {tasks? : Array<ITask>}){
    return <section className=" w-[100%] min-h-12 border-black flex flex-col p-4 gap-2 items-center text-black justify-center">
        {tasks ? tasks.length > 0 ? tasks.map((task) => <TaskItem key={task.id} task={task} /> ) : <p>No tasks found</p> :  <p>No tasks found</p>}
    </section>
}