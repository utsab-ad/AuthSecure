import express from "express"
import { Login, Logout} from "../controllers/Auth.controller.js";
import { requireAuth } from "../middleware/requreAuth.middleware.js";

const AuthRoute = express.Router();

AuthRoute.post("/login", Login);
AuthRoute.get("/logout", requireAuth, Logout);

export default AuthRoute;