import express from "express";
import { CreateBlog, DeleteBlog, EditBlog, GetBlog, latestBlog } from "../controllers/Blog.controller.js";
import { requireAuth } from "../middleware/requreAuth.middleware.js";

const BlogRoute = express.Router();
BlogRoute.post("/create-blog", requireAuth, CreateBlog);
BlogRoute.put("/edit-blog/:id", EditBlog);
BlogRoute.get("/get-latest-blog", latestBlog);
BlogRoute.get("/get-blog/:id", GetBlog);
BlogRoute.delete('/delete-blog/:id', DeleteBlog);


export default BlogRoute;