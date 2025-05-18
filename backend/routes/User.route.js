import express from "express"
import { getAllUser } from "../controllers/User.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const UserRoute = express.Router();

UserRoute.get("/users", authenticate, getAllUser);

export default UserRoute;