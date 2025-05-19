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

  const handleShare = async () => {
    const shareData = {
      title,
      text: `Check out this blog post: ${title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link.");
        console.error("Clipboard error:", err);
      }
    }
  };

  return (
    <main className="w-full px-4 md:px-12 py-8 max-w-6xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-indigo-600 leading-tight">
          {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-indigo-400 mt-2">
          {slug}
        </p>
      </header>

      <div className="flex justify-end gap-2 mb-4">
        <Button
          onClick={handleShare}
          variant="outline"
          className="p-2 hover:bg-gray-100 transition dark:hover:text-black"
        >
          <FaShareAlt className="text-lg" />
        </Button>
        {user && user.isLoggedIn && (
          <Link to={RouteEditBlog(blogid)}>
            <Button
              variant="outline"
              className="p-2 hover:bg-gray-100 transition dark:hover:text-black"
            >
              <HiPencilAlt className="text-lg" />
            </Button>
          </Link>
        )}
      </div>

      <div className="mb-6 text-sm md:text-base text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-semibold">Author:</span> {author}
        </p>
        <p>
          <span className="font-semibold">Created At:</span> {createdDate}
        </p>
        <p>
          <span className="font-semibold">Updated At:</span> {updatedDate}
        </p>
      </div>

      <article
        className="blog-content prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content),
        }}
      />
    </main>
  );
};

export default BlogDetail;
