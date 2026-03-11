// Imports
import express from "express";
import dotenv from "dotenv";
import {logReq, globalError} from "./middleware/middleware.js";
import userRoutes from "./routes/userRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import mtaRoutes from "./routes/mtaRoutes.js";
import pinnedLinesRoutes from "./routes/pinnedLinesRoutes.js"
import connectDB from "./db/conn.js";
import cors from "cors";

// Setups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logReq);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/mta", mtaRoutes);
app.use("/api/pinned", pinnedLinesRoutes);

// Global Error Handling Middleware
app.use(globalError);

// Listener
app.listen(PORT, () => {
   console.log(`Server is Running on PORT: ${PORT}`);
})