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
      .then((result) => setBlogs(result.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (blogId) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/blog/api/delete-blog/${blogId}`
      )
      .then(() => navigate(RouteBlogs))
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
          <Link
            to={RouteBlogDetail(blog._id)}
            key={blog._id}
            className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md transition-shadow duration-300 p-4 flex flex-col justify-between gap-3"
          >
            <div className="text-xs text-gray-500 font-medium">
              {moment(blog.createdAt).format("DD MMM YYYY")}
            </div>

            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
              {blog.title}
            </h3>
              {user?.isLoggedIn && (
                <div className="flex items-center gap-2">
                  <Link to={RouteEditBlog(blog._id)}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-gray-100"
                      aria-label={`Edit ${blog.title}`}
                    >
                      <HiPencilAlt className="text-gray-500" />
                    </Button>
                  </Link>
                  <Button
                    onClick={() => handleDelete(blog._id)}
                    variant="destructive"
                    size="icon"
                    aria-label={`Delete ${blog.title}`}
                  >
                    <FaTrashAlt className="text-white text-xs" />
                  </Button>
                </div>
              )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
