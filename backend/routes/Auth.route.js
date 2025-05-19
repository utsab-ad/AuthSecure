import express from "express"
import { Login} from "../controllers/Auth.controller.js";

const AuthRoute = express.Router();

AuthRoute.post("/login", Login);

export default AuthRoute;