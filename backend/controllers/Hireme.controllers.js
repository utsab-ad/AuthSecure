import HiremeReq from "../models/Hireme.model.js";
import { CreateTokenHireme } from "../utils/tokens/generateTokens.js";

export const Hireme = async (req, res, next) => {
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

    const existingRequest = await HiremeReq.findOne({ email });

    if (existingRequest) {
      return res.status(401).json({
        success: false,
        message: "Request already exists please try after 3 days",
      });
    }

    const newRequest = await HiremeReq.create({
      companyName,
      address,
      email,
      category,
      contact,
      noOfEmployees,
      description,
      source,
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
    res.status(201).json({
        success: true,
        message: "Application submitted",
        newRequest
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error".error.message],
    });
  }
};

export const HiremeApplications = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error".error.message],
    });
  }
};

export const HiremeDetails = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error".error.message],
    });
  }
};

export const HiremeDelete = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error".error.message],
    });
  }
};
