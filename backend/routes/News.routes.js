import express from "express";
import { GetNews } from "../controllers/News.controllers.js";

const NewsRoute = express.Router();

NewsRoute.get("/new", GetNews);

export default NewsRoute;
