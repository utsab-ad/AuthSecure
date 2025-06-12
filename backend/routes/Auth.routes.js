import express from "express";
import { Login, LoginAdminGoogle, Register } from "../controllers/Auth.controllers.js";

const AuthRoute = express.Router();

AuthRoute.get("/admin", LoginAdminGoogle);
AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);

export default AuthRoute;