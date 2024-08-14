import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const {PORT, MONGO_URI} = process.env;

mongoose
  .connect(MONGO_URI, {dbName: "Final"})
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Failed to connected to DB"));

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
