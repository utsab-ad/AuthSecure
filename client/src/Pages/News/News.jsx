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
import {
  RouteEkantipur,
  RouteKathmanduPost,
  RouteTechPana,
} from "@/helpers/RouteNames.js";
import { Skeleton } from "@/components/ui/skeleton";

const News = () => {
  const [newses, setNews] = useState([]);
  const [ktmposts, setktmPost] = useState([]);
  const [techpanas, setTechPana] = useState([]);
  const [ekantiposts, setEkantipost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getNews = async () => {
      try {
        const ktmpost = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/news/ktmpost`
        );
        const topKtmPostNews = ktmpost.data.news.slice(0, 3);
        setktmPost(topKtmPostNews);

        const ekantipur = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/news/ekantipur`
        );
        const topKanitpost = ekantipur.data.news.slice(0, 3);
        setEkantipost(topKanitpost);
        const techpana = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/news/techpana`
        );
        const toptechPana = techpana.data.news.slice(0, 3);
        setTechPana(toptechPana);
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
      <div className="w-full py-6 px-4">
        <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-800 tracking-tight">
            📰 Explore Latest News
          </h1>
          <p className="text-stone-600 text-base sm:text-lg">
            Choose your preferred{" "}
            <strong className="text-stone-800 font-semibold">
              news source
            </strong>{" "}
            and{" "}
            <strong className="text-stone-800 font-semibold">category</strong>{" "}
            to stay informed with the latest headlines.
          </p>
        </div>
      </div>

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
        <>
          <div className="w-full flex items-center justify-between bg-stone-900 px-4 py-2 rounded-md shadow-sm">
            <h2 className="text-base font-semibold text-gray-200 tracking-wide">
              The Katmandu Post
            </h2>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={RouteKathmanduPost}
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                  aria-label="Go to The Kathmandu Post"
                >
                  <IoIosArrowForward size={22} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="text-sm font-medium">
                <p>Go to The Kathmandu Post</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6 max-w-7xl mx-auto">
            {ktmposts &&
              ktmposts.map(
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
          <div className="w-full flex items-center justify-between bg-stone-900 px-4 py-2 rounded-md shadow-sm">
            <h2 className="text-base font-semibold text-gray-200 tracking-wide">
              eKantipur
            </h2>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={RouteEkantipur}
                  className="text-gray-200 hover:text-white transition-colors duration-200"
                  aria-label="Go to eKantipur"
                >
                  <IoIosArrowForward size={22} />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="text-sm font-medium">
                <p>Go to eKantipur</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6 max-w-7xl mx-auto">
            {ekantiposts &&
              ekantiposts.map(
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
                        <h2
                          style={{
                            fontFamily: "'Noto Sans Devanagari', sans-serif",
                          }}
                          className="text-xl font-semibold text-gray-800 mb-2"
                        >
                          {news.headline}
                        </h2>
                        <p
                          style={{
                            fontFamily: "'Noto Sans Devanagari', sans-serif",
                          }}
                          className="text-sm text-gray-500 border-l-4 border-green-600 pl-3 mb-4"
                        >
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
          <div className="w-full flex flex-row items-center justify-between bg-stone-900 py-1 px-2">
            <h2 className="text-sm font-semibold text-gray-300">Tech Pana</h2>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to={RouteTechPana} className="text-gray-300 font-bold">
                  <IoIosArrowForward size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tech Pana</p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="flex pb-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-3 justify-center items-start gap-3 pt-5 flex-col mx-auto">
            {techpanas &&
              techpanas.map((news) => (
                <>
                  {news.headline && news.link && news.image && (
                    <card className="flex flex-col border bg-white rounded-lg mx-auto max-w-100">
                      <img
                        src={news.image}
                        className="rounded-t-lg"
                        alt="image"
                      />
                      <div className="px-3 py-2 pb-4">
                        <p
                          style={{
                            fontFamily: "'Noto Sans Devanagari', sans-serif",
                          }}
                          className="border-l-3 pl-2 my-2 border-green-600 py-2 text-sm font-bold text-stone-500"
                        >
                          {news.headline}
                        </p>
                        <div className="w-full">
                          <Link to={`${news.link}`}>
                            <Button
                              variant=""
                              className="w-full bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
                            >
                              Read at Tech Pana
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </card>
                  )}
                </>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default News;
