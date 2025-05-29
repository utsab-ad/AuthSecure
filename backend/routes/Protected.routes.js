import express from "express";
import { hiremeRequestApp } from "../middleware/requreAuth.middleware.js";
import { findRequest } from "../controllers/Hireme.controller.js";

const ProtectedRoute = express.Router();

ProtectedRoute.get("/get-request", hiremeRequestApp, findRequest);

export default ProtectedRoute;