import { RouteBlogDetail, RouteBlogs } from "@/helper/RouteNames.js";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LatestBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [blogid, setBlogid] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/blog/api/get-latest-blog`)
      .then((result) => {
        setBlogid(result.data._id);
        setTitle(result.data.title);
        setSlug(result.data.slug);
        setAuthor(result.data.author);
        setCreatedDate(
          moment(result.data.createdAt).format("DD-MM-YYYY hh:mm A")
        );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
   <div className="flex flex-col items-center">
  <h3 className="font-bold text-indigo-700 dark:text-white text-2xl text-center mb-4">
    Latest Blog
  </h3>

  <div className="bg-white/90 w-full dark:bg-[#111827] border border-blue-200 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-blue-800 dark:text-indigo-600 ">{title}</h3>
      </div>

      <p className="text-gray-700 dark:text-white text-base leading-relaxed line-clamp-3">
        {slug}
      </p>
      <Link
        to={RouteBlogDetail(blogid)}
        className="inline-block w-fit text-sm font-medium text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Read full blog →
      </Link>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <time className="text-sm text-gray-600 font-medium dark:text-white">
          {createdDate}
        </time>
         <p className="text-sm text-gray-600 dark:text-white font-medium">-by {author}</p>
      </div>
    </div>
  </div>
   <div className='flex justify-end items-center w-full cursor-pointer'>
        <Link to={RouteBlogs} className='text-sm w-fit p-2 text-blue-600 hover:underline text-right'>All Blogs →</Link>
    </div>
</div>

  );
};

export default LatestBlog;
