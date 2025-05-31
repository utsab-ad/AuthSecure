import express from "express";
import { requireAuth, requireRequest } from "../middleware/requreAuth.middleware.js";
import { deleteRequest, findRequest, getRequest, requestDetail } from "../controllers/Hireme.controller.js";

const ProtectedRoute = express.Router();

ProtectedRoute.get("/", findRequest);
ProtectedRoute.get("/get-request/:id", getRequest);
ProtectedRoute.delete("/delete/:id", deleteRequest);
ProtectedRoute.get("/offer-status",requireRequest, requestDetail)

export default ProtectedRoute;