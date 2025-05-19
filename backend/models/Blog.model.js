import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  author: String,
  content: String
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema, 'blogs');
export default Blog;