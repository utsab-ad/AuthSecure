import HiremeReq from "../models/Hireme.model.js";
import { htmlHireme } from "../utils/emailPage.js";
import sendEmail from "../utils/sendEmail.js";
import { tempRequeststore } from "../utils/tempRequestStore.js";
import { CreateTokenHireme } from "./Token.controller.js";

export const findRequest = async (req, res, next) => {
  try {
    HiremeReq.find({})
      .sort({ createdAt: -1 })
      .exec()
      .then((requests) => res.json(requests))
      .catch((err) => res.json(err));
  } catch (error) {
    next(handleError(500, error.messsage));
  }
};

export const getRequest = async (req, res, next) => {
  try {
    const requestid = req.params.id;

    HiremeReq.findById({ _id: requestid })
      .then((request) => res.json(request))
      .catch((err) => res.json(err));
  } catch (error) {
    next(handleError(500, error.messsage));
  }
};

export const HiremeRequest = async (req, res, next) => {
  try {
    const {
      companyName,
      address,
      email,
      category,
      contact,
      noOfEmployees,
      description,
      source,
    } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 5 * 60 * 1000; // 5 min

    const html = htmlHireme(companyName, otp);

    const existingRequest = await HiremeReq.findOne({ email });

    if (existingRequest) {
      return res.status(401).json({
        success: false,
        message: "Request already exists please try after 3 days",
      });
    }

    // Save to temporary store
    tempRequeststore.set(email, {
      companyName,
      address,
      email,
      category,
      contact,
      noOfEmployees,
      description,
      source,
      otp,
      otpExpires,
    });

    await sendEmail(email, "OTP Verification", html);

    return res.status(200).json({
      success: true,
      message: "OTP sent to email. Verify to complete registration.",
    });
  } catch (error) {}
};

export const deleteRequest = async (req, res, next) => {
  const requestid = req.params.id;
  HiremeReq.findByIdAndDelete({ _id: requestid })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
};

export const requestDetail = async (req, res, next) => {
  try {
    if(!req.request) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access"
      });
    }
    
    res.json(req.request);

    res.status(200).status({
      success: true,
      message: "Authorized access",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error"],
    });
  }
};
