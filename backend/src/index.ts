import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.js";
import contentRouter from "./routes/content.js";
import brainRouter from "./routes/brain.js";
import { config } from "./config.js";
import cors from 'cors';

await mongoose
.connect(config.mongoUrl)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Connection error", err));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", contentRouter);
app.use("/api/v1", brainRouter);

app.listen(config.port, () => {
  console.log(`Server running on PORT: ${config.port}`);
});