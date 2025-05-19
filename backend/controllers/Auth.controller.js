import { handleError } from "../helpers/handleError.js";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return next(handleError(404, "Invalid login credentials"));
    }

    const hashedPassword = user.password;

    const comparePassword = await bcrypt.compare(password, hashedPassword);

    if (!comparePassword) {
      console.log("Password does not match");
      return next(handleError(404, "Invalid login credentials"));
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        contact: user.contact
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      path: "/",
      maxAge: 1000 * 60,
    });

    const newUser = user.toObject({ getters: true });
    delete newUser.password;

    res.status(200).json({
      success: true,
      user: newUser,
      message: "Login Successfull",
    });
  } catch (error) {
    console.error("Login Error:", error);
    next(handleError(500, error.message));
  }
};

