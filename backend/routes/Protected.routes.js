import express from "express";
import { hiremeRequestApp, requireAuth } from "../middleware/requreAuth.middleware.js";
import { deleteRequest, findRequest, getRequest } from "../controllers/Hireme.controller.js";

const ProtectedRoute = express.Router();

ProtectedRoute.get("/", findRequest);
ProtectedRoute.get("/get-request/:id", getRequest);
ProtectedRoute.delete("/delete/:id", deleteRequest);

export default ProtectedRoute;