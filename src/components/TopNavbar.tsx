import Link from "next/link";

export default function TopNavbar(){
    return <nav className="w-[90%] h-20 bg-white rounded-sm flex justify-evenly  gap-4 items-center text-white pl-2 pr-2 m-4 shadow-sm">
        
        <div className="w-[95%] h-[80%] flex justify-between gap-3 bg-white justify-self-end rounded-xl p-1 border-4">
        <input type="text" placeholder="Enter text" className="w-[75%] pl-2 pr-2 rounded-xl text-black"/>
        <div className="flex gap-2">
        <button type="button" className=" w-40  p-1 rounded-xl bg-blue-500 font-semibold pl-2 pr-2 pb-2">Add Task</button>
        <button type="button" className=" bg-slate-300 p-1 rounded-xl text-slate-600 font-semibold pl-2 pr-2 pb-2">Search</button></div>
        </div>
        
    </nav>
}