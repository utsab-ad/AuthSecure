import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import moment from "moment";
import { FaShareAlt } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { RouteEditBlog } from "@/helper/RouteNames.js";
import { useSelector } from "react-redux";

const BlogDetail = () => {
  const user = useSelector((state) => state.user);
  const { blogid } = useParams();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/blog/api/get-blog/` + blogid)
      .then((result) => {
        setTitle(result.data.title);
        setSlug(result.data.slug);
        setAuthor(result.data.author);
        setContent(result.data.content);
        setCreatedDate(
          moment(result.data.createdAt).format("DD-MM-YYYY hh:mm A")
        );
        setUpdatedDate(
          moment(result.data.updatedAt).format("DD-MM-YYYY hh:mm A")
        );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="max-w-3xl mx-auto w-full my-8 px-4">
      <div className="bg-white dark:bg-[#111827] dark:text-white shadow-md border border-gray-200 rounded-2xl p-6 transition-shadow hover:shadow-xl">
        <header className="mb-3">
          <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-indigo-700 leading-tight">
            {title}
          </h1>
          <p className="text-center text-sm text-gray-500 dark:text-indigo-500 mt-1">
            {slug}
          </p>
        </header>
        <div className="flex justify-between items-center pb-1 mb-1 w-full ">
          <Link>
            <Button
              variant="outline"
              className="p-2 hover:bg-gray-100 transition dark:hover:text-black"
            >
              <FaShareAlt className="text-lg" />
            </Button>
          </Link>
          {user && user.isLoggedIn ? (
            <>
              <Link to={RouteEditBlog(blogid)}>
                <Button
                  variant="outline"
                  className="p-2 hover:bg-gray-100 transition dark:hover:text-black"
                >
                  <HiPencilAlt className="text-lg" />
                </Button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="flex w-full flex-col md:px-4 text-sm text-gray-600 dark:text-gray-400">
          <p>Title: {title}</p>
          <p>Author: {author} </p>
          <p>Created At: {createdDate}</p>
          <p>Updated At: {updatedDate}</p>
        </div>

        <article
          className="blog-content border-t border-stone-300 dark:text-white text-gray-700"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
