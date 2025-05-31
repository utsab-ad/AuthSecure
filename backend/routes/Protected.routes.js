import express from "express";
import { requireAuth, requireRequest } from "../middleware/requreAuth.middleware.js";
import { acceptRequest, deleteRequest, deleteRequestByClient, findRequest, getRequest, requestDetail } from "../controllers/Hireme.controller.js";

const ProtectedRoute = express.Router();

ProtectedRoute.get("/", findRequest);
ProtectedRoute.post("/accept", requireAuth, acceptRequest);
ProtectedRoute.get("/get-request/:id", getRequest);
ProtectedRoute.delete("/delete/:id", deleteRequest);
ProtectedRoute.get("/offer-status",requireRequest, requestDetail);
ProtectedRoute.post("/delete-confirm",requireRequest, deleteRequestByClient);

export default ProtectedRoute;