import express from "express";
import { verifyLoginOtp, verifyRequestOtp } from "../controllers/Otp.controller.js";

const OtpRoute = express.Router();

OtpRoute.post("/verify", verifyLoginOtp);
OtpRoute.post("/verifyrequest", verifyRequestOtp);

export default OtpRoute;