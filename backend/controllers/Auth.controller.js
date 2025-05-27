import { handleError } from "../helpers/handleError.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import htmlLogin from "../utils/emailPage.js";
import sendEmail from "../utils/sendEmail.js";
import { tempUserStore } from "../utils/tempUserStore.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not found",
      });
    }

    const hashedPassword = await user.password;

    const matchPassword = await bcrypt.compare(password, hashedPassword);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min
    
        const html = htmlLogin(otp);
    
        tempUserStore.set(email, { otp, otpExpires });
    
        await sendEmail(email, "OTP Verification", html);
    
        return res.status(200).json({
          success: true,
          message: "OTP sent to email. Verify to Login.",
        });

    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error ",
    });
    console.log(error);
  }
};

