import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
import colors from "colors";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";
// import
dotenv.config();
connectToDb();

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, console.log(`Server running on port ${port}`.yellow.bold));
