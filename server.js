// Imports
import express from "express";
import dotenv from "dotenv";
import {logReq, globalError} from "./middleware/middleware.js"
import cors from "cors";
import connectDB from "./db/conn.js";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// Middleware
app.use(express.json());
app.use(logReq);
// Routes


// Global Error Handling Middleware
app.use(globalError);

// Listener
app.listen(PORT, () => {
   console.log(`Server is Running on PORT: ${PORT}`);
})