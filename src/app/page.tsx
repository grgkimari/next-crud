"use client"
import Divider from "@/components/Divider";
import TaskList from "@/components/TaskList";
import TopNavbar from "@/components/TopNavbar";
import { ITask } from "@/types";
import { useEffect, useState } from "react";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
async function getTasks() {
  
  
  if (!baseURL) {
    throw new Error("Base URL is not defined");
  }

  const response = await fetch(`${baseURL}/api/tasks`, {
    next: {
      revalidate: 30
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  const data = (await response.json()).data;

  return data;
}

export default function Home() {
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [text, setText] = useState("")
  async function addQuickTask() {
    if(text === "") alert("Please enter some text")
    else{
      const newQuickTask = {
        title : text
      }
      try {
        await fetch(`${baseURL}/api/tasks`, {
          method : "POST",
          body : JSON.stringify(newQuickTask)
        })
        setTasks([...tasks, {
          title : text,
          completed : false

        }])
        setText("")
      } catch (error) {
        console.log("Unable to post request")
      }
      
    }
  }
  
  useEffect(() => {
    async function fetchData(){
      try {
        setTasks(await getTasks());
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[url('/pexels-stywo-1261728.jpg')] bg-cover regular-text">
      <div className="bg-gray-500 bg-opacity-65 border-2 min-w-[600px] min-h-96 rounded-xl shadow-2xl shadow-white items-center justify-center flex flex-col">
        <p className="underline text-blue-400 playful-text text-7xl m-12">My To Dos</p>
        <TopNavbar text={text} setText={setText} postFunction={addQuickTask} />
        <Divider />
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
