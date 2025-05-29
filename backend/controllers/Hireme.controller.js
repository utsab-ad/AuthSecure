import HiremeReq from "../models/Hireme.model.js";
import { htmlHireme } from "../utils/emailPage.js";
import sendEmail from "../utils/sendEmail.js";
import { tempRequeststore } from "../utils/tempRequestStore.js";
import { CreateTokenHireme } from "./Token.controller.js";

export const findRequest = async (req, res, next) => {
  try {
    const { email } = req.body;

    const request = await HiremeReq.findOne({ email });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "No application found for this email.",
      });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error(error); // for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
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

// export const HiremeRequest = async (req, res, next) => {
//   try {
//     const {
//       companyName,
//       address,
//       email,
//       category,
//       contact,
//       noOfEmployees,
//       description,
//       source,
//     } = req.body;

//     const newRequest = await HiremeReq.create({
//       companyName,
//       address,
//       email,
//       category,
//       contact,
//       noOfEmployees,
//       description,
//       source,
//     });

//     if (!newRequest) {
//       res.status(500).json({
//         success: false,
//         message: "Request creation failed",
//       });
//     }

//     const maxAge = 3 * 24 * 60 * 60;
//     const token = CreateTokenHireme(newRequest, maxAge);

//     res.cookie("jwt", token, {
//       httpsOnly: true,
//       secure: true,
//       sameSite: "None",
//       maxAge: maxAge * 1000,
//     });

//     console.log("Cookie created succefully");
//     res.status(201).json({
//       success: true,
//       message: "Intern request send",
//       company: companyName,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };
