import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import moment from "moment";
import { FaShareAlt } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Button } from "@/components/ui/button";

const ProgressDetail = () => {
  const { id } = useParams();
  const [progress, setProgress] = useState({});

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/progress/get-by-id/${id}`)
      .then((res) => setProgress(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleShare = async () => {
    const shareData = {
      title: progress.title,
      text: `Check out this progress report: ${progress.title}`,
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
      }
    }
  };

  return (
    <div className=" bg-slate-900 min-h-screen text-slate-100 px-4 md:px-12 py-8 max-w-6xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-indigo-400 mb-2">
          {progress.title}
        </h1>
        <p className="text-sm text-slate-500 italic">{progress.slug}</p>
      </header>

      <div className="flex justify-end gap-2 mb-4">
        <Button onClick={handleShare} variant="outline">
          <FaShareAlt />
        </Button>
        <Link to={`/progress/edit/${progress._id}`}>
          <Button variant="outline">
            <HiPencilAlt />
          </Button>
        </Link>
      </div>

      <section className="mb-6 text-slate-600 text-sm md:text-base space-y-1">
        <p><strong>Author:</strong> {progress.author}</p>
        <p><strong>Invested Time:</strong> {progress.investedTime}</p>
        <p><strong>Created At:</strong> {moment(progress.createdAt).format("DD-MM-YYYY hh:mm A")}</p>
        <p><strong>Updated At:</strong> {moment(progress.updatedAt).format("DD-MM-YYYY hh:mm A")}</p>
      </section>

      <article
        className="progress-content prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(progress.content),
        }}
      />
    </div>
  );
};

export default ProgressDetail;
