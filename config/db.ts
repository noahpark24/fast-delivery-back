import mongoose from "mongoose";

const URL = "mongodb://mongodb/fast-delivery-back";

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("DB is connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};
export default connectDB;
