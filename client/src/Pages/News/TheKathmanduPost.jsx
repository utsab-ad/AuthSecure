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
          `${import.meta.env.VITE_API_BASE_URL}/news/ktmpost`
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

      <div className="flex pb-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-3 justify-center items-start gap-3 pt-5 flex-col mx-auto">
        {newses &&
          newses.map((news) => (
            <>
              {loading ? (
                <>
                  {" "}
                  <div className="flex justify-center items-center flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {news.headline && news.slug && news.link && news.image && (
                    <card className="flex flex-col border bg-white rounded-lg mx-auto max-w-100">
                      <img
                        src={news.image}
                        className="rounded-t-lg"
                        alt="image"
                      />
                      <div className="px-3 py-2 pb-4">
                        <h2 className="text-lg text-stone-900 font-bold">
                          {news.headline}
                        </h2>

                        <p className="border-l-3 pl-2 my-2 border-green-600 py-2 text-sm font-bold text-stone-500">
                          {news.slug}
                        </p>
                        <div className="w-full">
                          <Link to={`https://kathmandupost.com${news.link}`}>
                            <Button
                              variant=""
                              className="w-full bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
                            >
                              Read at The Kathmandu Post
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </card>
                  )}
                </>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default TheKathmanduPost;

//TheKathmanduPost
