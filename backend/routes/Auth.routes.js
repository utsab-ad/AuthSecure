import express from "express";
import {LoginAdmin, LoginAdminGoogle, ClientRegister, LoginClient } from "../controllers/Auth.controllers.js";

const AuthRoute = express.Router();

AuthRoute.get("/admin", LoginAdminGoogle);
AuthRoute.post("/register/client", ClientRegister);
AuthRoute.post("/login/admin", LoginAdmin);
AuthRoute.post("/login/client", LoginClient);

export default AuthRoute;