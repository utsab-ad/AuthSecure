import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateAccessToken = async (user, maxAge) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: maxAge,
    }
  );
};
