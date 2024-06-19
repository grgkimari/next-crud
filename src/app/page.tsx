import Divider from "@/components/Divider";
import TaskList from "@/components/TaskList";
import TopNavbar from "@/components/TopNavbar";
import { ITask } from "@/types";


export default function Home() {
  const tasks : Array<ITask> = [{id: "1", title : "Task 1 title", description : "Task 1 description", dueDate : new Date(Date.now() + 864000000), completed : false}, {id : "2", title : "Task 2 title", description : "Task 2 description", completed : false}]
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-white regular-text">
      <div className=" min-w-[600px] min-h-96 bg-gray-100 rounded-xl shadow-2xl shadow-black shadow-gray-500 items-center justify-center flex flex-col" >
      <p className=" underline text-blue-400 playful-text text-7xl m-12 ">My To Dos</p>
      <TopNavbar />
      <Divider />
      <TaskList tasks={tasks}/>
      </div>
      
    </main>
  );
}
