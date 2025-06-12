import axios from "axios";
import Admin from "../models/Admin.model.js";
import oauth2client from "../utils/oauth/googleConfig.js";
import { generateAccessToken } from "../utils/tokens/generateTokens.js";
import bcrypt from "bcrypt";

export const LoginAdminGoogle = async (req, res, next) => {
  try {
    const { code } = req.query;

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    let admin = await Admin.findOne({ email });
    if (!admin) {
      admin = await Admin.create({
        name,
        email,
        avatar: picture,
      });
    }
    console.log("hello 2");

    const maxAge = 3 * 24 * 60 * 60; // 3 days
    const token = await generateAccessToken(admin, maxAge);

    console.log("hello 3");

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: maxAge * 1000,
    });

    const safeUser = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      avatar: admin.avatar,
    };

    res.status(201).json({
      success: true,
      message: "User authenticated",
      admin: safeUser,
      token,
    });
  } catch (error) {
    console.error("Google OAuth Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const LoginAdmin = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error".error.message],
    });
  }
};

export const LoginClientGoogle = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error".error.message],
    });
  }
};

export const LoginClient = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error".error.message],
    });
  }
};

export const Logout = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: ["Internal Server Error".error.message],
    });
  }
};

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email, password are required",
      });
    }

    const existingUser = await Admin.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(500).json({
        success: false,
        message: ["User not created", error],
      });
    }

    const maxAge = 3 * 24 * 60 * 60;

    const accessToken = generateAccessToken(newUser, maxAge);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user: newUser.name,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: ["Internal Server Error", error.message],
    });
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "ALl fields are required",
      });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const hashedPassword = await admin.password;
    const matchPassword = await bcrypt.compare(password, hashedPassword);

    if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const maxAge = 3 * 24 * 60 * 60;

    const accessToken = await generateAccessToken(admin, maxAge);

    if (!accessToken) {
      return res.status(500).json({
        success: false,
        message: "Token is not created",
      });
    }
    
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      success: true,
      messsage: "Logged In Successfuly",
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
