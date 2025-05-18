import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import AuthRoute from "./routes/Auth.route.js";
import mongoose from "mongoose";
import UserRoute from "./routes/User.route.js";
import cookieParser from "cookie-parser";

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

mongoose.connect(process.env.MONGODB_URL, {dbName: 'data-base'})
.then(() => console.log("mongodb connected"))
.catch(err => console.log("!! DATABASE WARN !!", err));

app.listen(PORT, (req, res) => {
    console.log(`Server is running on ${PORT}`);
})
