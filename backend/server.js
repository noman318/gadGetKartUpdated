import path from "path";
import express from "express";
import dotenv from "dotenv";
import { products } from "../data.js";

dotenv.config();
const app = express();
const port = 5000;
app.use(express.json());

app.get("/", (req, res) => {
  res.json("API is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(port, console.log(`Server running on port ${port}`));
