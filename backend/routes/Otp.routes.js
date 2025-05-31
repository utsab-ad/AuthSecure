import express from "express";
import { verifyDelete, verifyLoginOtp, verifyRequestOtp } from "../controllers/Otp.controller.js";

const OtpRoute = express.Router();

OtpRoute.post("/verify", verifyLoginOtp);
OtpRoute.post("/verifyrequest", verifyRequestOtp);
OtpRoute.post("/verify-delete-req", verifyDelete);

export default OtpRoute;