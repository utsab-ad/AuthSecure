import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import AuthRoute from "./routes/Auth.route.js";
import mongoose from "mongoose";
import UserRoute from "./routes/User.route.js";
import cookieParser from "cookie-parser";
import BlogRoute from "./routes/Blog.route.js";
import { findBlog } from "./controllers/Blog.controller.js";
import OtpRoute from "./routes/Otp.routes.js";
import jwt from "jsonwebtoken";
import FormRoute from "./routes/Form.routes.js";
import ProtectedRoute from "./routes/Protected.routes.js";

dotenv.config();


const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use('/auth', AuthRoute);
app.use('/in', UserRoute);
app.use("/requests", ProtectedRoute);
app.use("/otp", OtpRoute);
app.use("/forms", FormRoute);


app.use("/blog/api", BlogRoute);
app.get("/blogs", findBlog)

mongoose.connect(process.env.MONGODB_URL, {dbName: 'data-base'})
.then(() => console.log("mongodb connected"))
.catch(err => console.log("!! DATABASE WARN !!", err));

app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT}`);
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500 
  const message = err.message || 500
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})
