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
      .delete(`${import.meta.env.VITE_API_BASE_URL}/blog/api/delete-blog/${blogId}`)
      .then(() => navigate(RouteBlogs))
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col pt-6 px-4 md:px-8 lg:px-12 space-y-6">
      {user && user.isLoggedIn ? (
        <>
          <div className="flex justify-center">
            <Link to={RouteCreateBlog}>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-stone-800 text-stone-800 hover:bg-stone-800 hover:text-white transition"
              >
                <FaPlus />
                <span className="font-semibold text-lg">Upload Blog</span>
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <></>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="max-w-3xl w-full mx-auto">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 border-1 border-black dark:border-white dark:from-gray-900 dark:via-slate-900 dark:to-gray-950 text-gray-800 dark:text-white md:w-full border border-gray-200 rounded-xl shadow-md p-6  hover:shadow-lg transition">
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-indigo-700">
                    {blog.title}
                  </h3>
                  {user && user.isLoggedIn ? <>
                    <Link to={RouteEditBlog(blog._id)}>
                    <Button
                      variant="outline"
                      className="p-2 hover:bg-gray-100 dark:hover:bg-stone-600 dark:hover:text-black transition"
                      aria-label={`Edit ${blog.title}`}
                    >
                      <HiPencilAlt className="text-lg" />
                    </Button>
                  </Link>
                  </> : <></>}
                </div>

                <p className="text-gray-700 text-base dark:text-white leading-relaxed">
                  {blog.slug}
                </p>

                <Link
                  to={RouteBlogDetail(blog._id)}
                  className="inline-block w-fit text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Read full blog →
                </Link>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <time className="text-sm font-semibold text-gray-600 dark:text-white">
                    {moment(blog?.createdAt).format("DD-MM-YYYY")}
                  </time>

                  {user && user.isLoggedIn ? (
                    <>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 bg-red-600 text-white border-red-600 hover:bg-white dark:hover:bg-stone-900 hover:text-red-600 hover:border-red-600 px-4 py-2 rounded-md transition-colors"
                        onClick={() => handleDelete(blog._id)}
                        aria-label={`Delete ${blog.title}`}
                      >
                        <FaTrashAlt />
                        <span>Delete</span>
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
