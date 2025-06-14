import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { Skeleton } from "@/components/ui/skeleton";

const TheKathmanduPost = () => {
  const [newses, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/news/ktmpost`,
          { withCredentials: true }
        );
        setNews(response.data.news);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, []);
  return (
    <div className="">
      <div>
        <div className="p-4 flex justify-center items-center flex-col text-center">
          <h1 className="text-2xl font-bold text-stone-800">
            📰 The Kathmandu Post
          </h1>
          <p className="text-stone-500 text-sm max-w-xl">
            You can read latest <strong>news </strong> from{" "}
            <strong>The Kathmandu Post</strong> to stay informed.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center p-2 mb-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="text-gray-300 font-bold">
              <Button>
                The Kathmandu Post
                <IoIosArrowForward size={24} />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Official Site</p>
          </TooltipContent>
        </Tooltip>
      </div>
      {/* <div className="flex flex-row w-full px-2 items-center justify-between">
        <h2 className="bg-indigo-500 py-0 px-2 pr-3 text-sm font-semibold text-white rounded-r-full">
          Category
        </h2>
        <div className="flex gap-2 grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3">
          <Link className="rounded-lg border-1 border-black text-sm hover:bg-gray-300 flex items-center justify-center py-0 px-2 ">
            National
          </Link>
          <Link className="rounded-lg border-1 border-yellow-600 text-sm hover:bg-gray-300 flex items-center justify-center py-0 px-2 ">
            Political
          </Link>
          <Link className="rounded-lg border-1 border-indigo-600 text-sm hover:bg-gray-300 flex items-center justify-center py-0 px-2 ">
            Tech
          </Link>
          <Link className="rounded-lg border-1 border-green-600 text-sm hover:bg-gray-300 flex items-center justify-center py-0 px-2 ">
            Health
          </Link>
        </div>
      </div> */}

      {loading ? (
        <div className="flex pb-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-3 justify-center items-start gap-3 pt-5 flex-col mx-auto">
          <div className="flex mb-3 justify-center items-center flex-col space-y-3 px-4">
            <Skeleton className="h-[125px] w-full max-w-sm rounded-xl" />
            <div className="space-y-2 w-full max-w-sm">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="flex mb-3 justify-center items-center flex-col space-y-3 px-4">
            <Skeleton className="h-[125px] w-full max-w-sm rounded-xl" />
            <div className="space-y-2 w-full max-w-sm">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="flex mb-3 justify-center items-center flex-col space-y-3 px-4">
            <Skeleton className="h-[125px] w-full max-w-sm rounded-xl" />
            <div className="space-y-2 w-full max-w-sm">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6 max-w-7xl mx-auto">
          {newses &&
            newses.map(
              (news) =>
                news.headline &&
                news.slug &&
                news.link &&
                news.image && (
                  <div
                  key={news.slug}
                    className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      src={news.image}
                      alt="News Image"
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 flex flex-col justify-between h-full">
                      <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {news.headline}
                      </h2>
                      <p className="text-sm text-gray-500 border-l-4 border-green-600 pl-3 mb-4">
                        {news.slug}
                      </p>
                      <Link
                        to={`https://kathmandupost.com${news.link}`}
                        className="mt-auto"
                      >
                        <button className="w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
                          Read at The Kathmandu Post
                        </button>
                      </Link>
                    </div>
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
};

export default TheKathmanduPost;

//TheKathmanduPost
