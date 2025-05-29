import express from "express";
import { findRequest, HiremeRequest } from "../controllers/Hireme.controller.js";

const FormRoute = express.Router();

FormRoute.post("/intern", HiremeRequest);
FormRoute.post("/track-app", findRequest);


export default FormRoute;