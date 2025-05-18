import express from 'express';
import authRoutes from './routes/auth.route.js';
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import {app, server} from "./lib/socket.js";

dotenv.config();
// const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://chatty-chat-app-lo23.onrender.com",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
    connectDB();
});