import mongoose from "mongoose";

export default function connectToMongoDB(){
    try{
        mongoose.connect(process.env.MONGO_URI || "")
        console.log("Connected to DB successfully.")
    }
    catch(error){
        console.log(error)
    }
    
}