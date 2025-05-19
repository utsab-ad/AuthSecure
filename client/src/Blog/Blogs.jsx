import axios from "axios";
import {
  RouteBlogDetail,
  RouteBlogs,
  RouteCreateBlog,
  RouteEditBlog,
} from "../helper/RouteNames.js";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import moment from "moment";
import { HiPencilAlt } from "react-icons/hi";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Blogs = () => {
  const user = useSelector((state) => state.user);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (blogId) => {
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/blog/api/delete-blog/${blogId}`)
      .then(() => {
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="px-4 md:px-10 lg:px-16 py-8 max-w-7xl mx-auto">
      {user?.isLoggedIn && (
        <div className="flex justify-center mb-8">
          <Link to={RouteCreateBlog}>
            <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-base font-medium shadow-md transition">
              <FaPlus />
              Upload Blog
            </Button>
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-indigo-700">
                  {blog.title}
                </h3>
                {user?.isLoggedIn && (
                  <Link to={RouteEditBlog(blog._id)}>
                    <Button
                      variant="outline"
                      className="p-2 hover:bg-gray-100 transition"
                      aria-label={`Edit ${blog.title}`}
                    >
                      <HiPencilAlt className="text-lg" />
                    </Button>
                  </Link>
                )}
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                {blog.slug}
              </p>

              <Link
                to={RouteBlogDetail(blog._id)}
                className="inline-block text-indigo-600 text-sm font-medium hover:underline"
              >
                Read full blog →
              </Link>
            </div>

            <div className="flex justify-between items-center p-4 border-t border-gray-100">
              <time className="text-sm text-gray-500 font-medium">
                {moment(blog.createdAt).format("DD MMM YYYY")}
              </time>

              {user?.isLoggedIn && (
                <Button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
                  aria-label={`Delete ${blog.title}`}
                >
                  <FaTrashAlt className="text-sm" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
