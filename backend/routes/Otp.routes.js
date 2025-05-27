import express from "express";
import { verifyLoginOtp } from "../controllers/Otp.controller.js";

const OtpRoute = express.Router();

OtpRoute.post("/verify", verifyLoginOtp);

export default OtpRoute;