import "server-only";
import connectToMongoDB from "../libs/mongodb";
import TaskModel from "../models/TaskModel";
import { NextRequest } from "next/server";
import { ITask } from "@/types";
export async function GET(req: Request, res: Response) {
  console.log("Get request received");
  connectToMongoDB();
  let result: Array<ITask>, message: string, success: boolean;
  try {
    result = await TaskModel.find().exec();
    message = "Successfully fetched tasks";
    success = true;
  } catch (err) {
    console.log("Error fetching tasks : " + err);
    result = [];
    message = "Error fetching tasks";
    success = false;
  }

  return Response.json(
    {
      success,
      message,
      data: result,
    },
    {
      status: success ? 200 : 500,
    }
  );
}

export async function POST(req: NextRequest, res: Response) {
  console.log("Post request received");

  try {
    const body = await req.json();

    if (!Object.keys(body).length) {
      throw new Error("Empty JSON input");
    }

    const { title, dueDate, description, completed } = body;
    let success: boolean, message: string;

    connectToMongoDB();

    if (title && description && completed) {
      try {
        TaskModel.create({
          title,
          dueDate,
          description,
          completed: completed === "true" ? true : false,
        });
        success = true;
        message = "Successfully created task";
      } catch (err) {
        console.log(err);
        success = false;
        message = "Could not create task. Please try again later.";
      }
    }else if(title){
      try {
        TaskModel.create({
          title
    
        });
        success = true;
        message = "Successfully created task";
      } catch (err) {
        console.log(err);
        success = false;
        message = "Could not create task. Please try again later.";
      }
    } else {
      success = false;
      message = "Malformed request.";
    }

    return Response.json(
      {
        success,
        message,
      },
      {
        status: success ? 201 : message === "Malformed request." ? 400 : 400,
      }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Error processing request",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(req: Request, res: Response) {
  console.log("PUT request received");
  const body = await req.json();

  if (!Object.keys(body).length) {
    throw new Error("Empty JSON input");
  }

  const { title, dueDate, description, completed, id } = body;
  let success: boolean, message: string;

  connectToMongoDB();
  try {
    await TaskModel.updateOne(
      { _id: id },
      { title, dueDate, description, completed }
    ).exec();
    console.log("Successfully updated.");
    success = true;
    message = "Successfully updated.";
  } catch (error) {
    console.log(`Error updating task : ${error}`);
    success = false;
    message = "Could not update task. Please try again later.";
  }
  return Response.json({
    success,
    message,
  });
}

export async function DELETE(req : Request, res : Response){
    console.log("Delete request received")
    const body = await req.json();

  if (!Object.keys(body).length) {
    throw new Error("Empty JSON input");
  }

  const { id } = body;
  let success: boolean, message: string;

  connectToMongoDB();
  try{
    await TaskModel.deleteOne({_id : id}).exec()
    console.log(`Task with id ${id} deleted`)
     success = true
    message = `Task deleted`
  }
  catch(error){
    console.log(`Error deleting object`)
    success = false
    message = `Error deleting object`
  }

  return Response.json({message, success})
}