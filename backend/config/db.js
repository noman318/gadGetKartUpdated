import mongoose from "mongoose";
import colors from "colors";

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Prince_Engg",
    });
    console.log(
      `MongoDb connected Successfully ${conn.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log("Error While connecting to MongoDb".red);
    process.exit(1);
  }
};

export default connectToDb;
