import { tempUserStore } from "../utils/tempUserStore.js";
import User from "../models/User.model.js";
import { CreateToken, CreateTokenHireme } from "./Token.controller.js";
import { tempRequeststore } from "../utils/tempRequestStore.js";
import HiremeReq from "../models/Hireme.model.js";
import { tempDeleteRequeststore } from "../utils/tempDeleteRequeststore.js";

export const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body;
  const data = tempUserStore.get(email);

  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "No OTP request found" });
  }

  if (data.otp !== otp || Date.now() > data.otpExpires) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP" });
  }

  try {
   const maxAge = 3 * 24 * 60 * 60;

   const user = await User.findOne({ email });

    const token = CreateToken(user, maxAge);

    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token is not created",
      });
    }

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Logged in successfully",
      user: user.username,
    });
  } catch (error) {
    res.json(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const verifyRequestOtp = async (req, res) => {
  const { email, otp } = req.body;
  const data = tempRequeststore.get(email);
  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "No OTP request found" });
  }

  if (data.otp !== otp || Date.now() > data.otpExpires) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP" });
  }

  try {
    const newRequest = await HiremeReq.create({
      companyName: data.companyName,
      address: data.address,
      email: data.email,
      category: data.category,
      contact: data.contact,
      noOfEmployees: data.noOfEmployees,
      description: data.description,
      source: data.source,
      verified: true,
    });

    const maxAge = 3 * 24 * 60 * 60;
    const token = CreateTokenHireme(newRequest, maxAge);

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge * 1000,
    });

    console.log("Cookie created succefully");

    tempRequeststore.delete(email);

    res.status(201).json({
      success: true,
      message: "Request submitted",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "creation Failed" });
  }
};

export const verifyDelete = async (req, res, next) => {

  const { email, otp } = req.body;
  const data = tempDeleteRequeststore.get(email);

  if (!data) {
    return res
      .status(404)
      .json({ success: false, message: "No OTP request found" });
  }

  if (data.otp !== otp || Date.now() > data.otpExpires) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid or expired OTP" });
  }

  try {
    
    await HiremeReq.findByIdAndDelete({ _id: data.id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
    
    res.clearCookie("access_token", {
     httpsOnly: true,
     secure: true,
     sameSite: "None",
   });
    return res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "Deletion Failed" });
  }

}
