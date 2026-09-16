import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DataBase connected successfuly");
  });
  await mongoose.connect(`${process.env.MONGODB_URI}/ai-interview-coach`);
};

export default connectDB;
