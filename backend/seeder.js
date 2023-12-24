import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/Users.js";
import { products } from "./data/Products.js";
import User from "./models/User.model.js";
import Product from "./models/Product.model.js";
import Order from "./models/Order.model.js";
import connectToDb from "./config/db.js";
// users
// products;
dotenv.config();
connectToDb();

const importData = async () => {
  console.log("in import function");
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    let createdUser = await User.insertMany(users);
    const adminId = createdUser[0]?._id;
    console.log("adminId", adminId);
    const sampleProducts = products?.map((product) => {
      return { ...product, user: adminId };
    });
    await Product.insertMany(sampleProducts);
    console.log(`Data Imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.log("error", error);
    console.log(`Error Occured`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  console.log("in import function");
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(`Data Destroyed`.green.inverse);
    process.exit();
  } catch (error) {
    console.log("error", error);
    console.log(`Error Occured`.red.inverse);
    process.exit(1);
  }
};
// importData();
// console.log(process.argv[2]);
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
