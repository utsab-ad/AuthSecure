import { handleError } from "../helpers/handleError.js";
import User from "../models/User.model.js";

export const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find().sort({createdAt: -1})
    res.status(200).json({
      success: true,
      user
    })
    
  } catch (error) {
    console.error("Get Users Error:", error);
    next(handleError(500, error.message));
    
  }
}