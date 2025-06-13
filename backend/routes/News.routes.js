import express from "express";
import { GeteKantipur, GetKathmanduPost, GetTechPana } from "../controllers/News.controllers.js";

const NewsRoute = express.Router();

NewsRoute.get("/ktmpost", GetKathmanduPost);
NewsRoute.get("/techpana", GetTechPana);
NewsRoute.get("/ekantipur", GeteKantipur);

export default NewsRoute;
