import express from "express"
import { Login, Logout, Signup } from "../controllers/Auth.controller.js";

const AuthRoute = express.Router();

AuthRoute.post("/signup", Signup);
AuthRoute.post("/login", Login);
AuthRoute.get("/logout", Logout);

export default AuthRoute;