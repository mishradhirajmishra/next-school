import mongoose from "mongoose";
import { dbUrl } from "./key";

 

const connectDB = async () => {  
  try {
    if (mongoose.connection?.readyState === 0) {
      await mongoose.connect(dbUrl!);
      console.log("db connected successfully");
    }
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;