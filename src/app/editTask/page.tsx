"use client"
import "client-only"
import { ITask, ITaskFormValues } from "@/types"
import {useSearchParams } from "next/navigation"
import { FormikErrors, useFormik } from "formik"


export default function EditTaskPage(){
    const params = useSearchParams()
    const formik = useFormik<ITaskFormValues>({
        initialValues : {
            title : params ? params.get("title") || "" : "",
            description : params ? params.get("description") || "" : "",
            dueDate : params ? params.get("dueDate") || "01/01/1970" : undefined,
            completed : params ? params.get("completed") === "true" ? true : false : false 
        },
        onSubmit : async(taskValues, {setSubmitting}) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
                method : params ? "PUT" : "POST",
                body : JSON.stringify({
                    title : taskValues.title,
                    description : taskValues.description,
                    dueDate : taskValues.dueDate,
                    completed : taskValues.completed
                })
            })
            if(response.ok){
                alert("Success!")
            }else{
                alert("An error occurred. Please try again later.")
            }
            setSubmitting(false)
        },
        validate : (taskValues) => {
            const errors : FormikErrors<ITask> = {}
            if(taskValues.title === ""){
                errors.title = "Title is required"
            }
            
        }
    })
    console.log(`Form Values : ${JSON.stringify(formik.values)}`)
    
    return <div className="regular-text text-xl bg-[url('/pexels-stywo-1261728.jpg')] bg-cover text-black h-screen flex items-center justify-center">
        <form onSubmit={formik.handleSubmit} className="border-2 shadow-xl shadow-gray-300 min-w-96 min-h-96 rounded-lg flex flex-col p-4 justify-center items-stretch bg-gray-500 bg-opacity-45 text-center gap-2">
            <div className="flex self-center m-4">
            <p className="text-3xl text-black underline underline-offset-4">Edit Task</p>
            </div>
            
            <label htmlFor="Title">Title</label>
            <input name="title" type="text" title=" title" className="text-input" value={formik.values.title} onChange={formik.handleChange}/>
            <label htmlFor="Description">Description</label>
            <input name="description" type="text" title=" title" className="text-input" value={formik.values.description} onChange={formik.handleChange}/>
            <label htmlFor="dueDate">Due Date</label>
            <input name="dueDate" type="date" title=" title" className="text-input" value={formik.values.dueDate || "01/01/1970"} onChange={formik.handleChange}/>
            <div className="flex gap-4 items-center m-4"><label htmlFor="Completed">Completed</label>
            <input name="completed" type="checkbox" title="Task title" className="w-4 h-4 rounded-full"  value={formik.values.completed ? "on" : "off"} onChange={formik.handleChange}/></div>
            <button type="submit" title="Submit" className="w-[90%] h-[45px] rounded-3xl bg-blue-500 text-white m-4 p-2">Submit</button>
        </form>
    </div>
}