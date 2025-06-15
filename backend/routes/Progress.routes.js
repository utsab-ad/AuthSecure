import express from "express";
import { CreateProgress, GetProgressById, GetProgresses } from "../controllers/Progress.controllers.js";

const ProgressRoute = express.Router();

ProgressRoute.post("/create", CreateProgress);
ProgressRoute.get("/get-all", GetProgresses);
ProgressRoute.get("/get-by-id/:id", GetProgressById);

export default ProgressRoute;