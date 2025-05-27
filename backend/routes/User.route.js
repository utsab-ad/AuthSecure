import express from "express"
import { getAllUser } from "../controllers/User.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { requireAuth } from "../middleware/requreAuth.middleware.js";

const UserRoute = express.Router();

UserRoute.get("/users", requireAuth, getAllUser);

export default UserRoute;