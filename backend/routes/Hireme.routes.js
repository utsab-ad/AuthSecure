import express from "express"
import { Hireme } from "../controllers/Hireme.controllers.js";

const HiremeRoute = express.Router();

HiremeRoute.post("/request", Hireme);

export default HiremeRoute