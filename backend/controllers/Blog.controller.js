import { handleError } from "../helpers/handleError.js";
import Blog from "../models/Blog.model.js"

export const CreateBlog = async (req, res, next) => {
  try {
    Blog.create(req.body)
      .then((blogs) => res.json(blogs))
      .catch((err) => res.json(err));
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const GetBlog = async (req, res, next) => {
  try {
    const blogid = req.params.id;

    Blog.findById({ _id: blogid })
      .then((blogs) => res.json(blogs))
      .catch((err) => res.json(err));
  } catch (error) {
    next(handleError(500, error.messsage));
  }
};
export const findBlog = async (req, res, next) => {
  try {
    Blog.find({})
      .then((blogs) => res.json(blogs))
      .catch((err) => res.json(err));
  } catch (error) {
    next(handleError(500, error.messsage));
  }
};

export const latestBlog = async (req, res, next) => {
  try {
    await Blog.findOne().sort({ createdAt: -1 }).exec()
      .then((blogs) => res.json(blogs))
      .catch((err) => res.json(err));
  } catch (error) {
    next(handleError(500, error.messsage));
  }
};

export const EditBlog = async (req, res, next) => {
  try {
    const blogid = req.params.id;
    Blog.findByIdAndUpdate(
      { _id: blogid },
      {
            title: req.body.title,
            slug: req.body.slug,
            author: req.body.author,
            content: req.body.content
      }
    ).then((blogs) => res.json(blogs))
      .catch((err) => res.json(err));
  } catch (error) {
    next(handleError(500, error.message));
  }
};

export const DeleteBlog = async (req, res, next) => {
     const blogid = req.params.id;
    Blog.findByIdAndDelete({_id: blogid})
    .then(res => res.json(res))
    .catch(err => res.json(err));
}
