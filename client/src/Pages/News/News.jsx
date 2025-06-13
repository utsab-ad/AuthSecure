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

        const techpana = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/news/techpana`
        );
        const toptechPana = techpana.data.news.slice(0, 3);
        setTechPana(toptechPana);

        const ekantipur = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/news/ekantipur`
        );
        const topKanitpost = ekantipur.data.news.slice(0, 3);
        setEkantipost(topKanitpost);
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
            📰 Explore Latest News
          </h1>
          <p className="text-stone-500 text-sm max-w-xl">
            Choose your preferred <strong>news source</strong> and{" "}
            <strong>category</strong> to stay informed with the latest
            headlines.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row items-center justify-between bg-stone-900 py-1 px-2">
        <h2 className="text-sm font-semibold text-gray-300">
          The Kathmandu Post
        </h2>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={RouteKathmanduPost} className="text-gray-300 font-bold">
              <IoIosArrowForward size={24} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>The Kathmandu Post</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex pb-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-3 justify-center items-start gap-3 pt-5 flex-col mx-auto">
        {ktmposts &&
          ktmposts.map((news) => (
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
                  {" "}
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
              )}
            </>
          ))}
      </div>
      <div className="w-full flex flex-row items-center justify-between bg-stone-900 py-1 px-2">
        <h2 className="text-sm font-semibold text-gray-300">eKantipur</h2>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link to={RouteEkantipur} className="text-gray-300 font-bold">
              <IoIosArrowForward size={24} />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>eKantipur</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex pb-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-3 justify-center items-start gap-3 pt-5 flex-col mx-auto">
        {ekantiposts &&
          ekantiposts.map((news) => (
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
                        <h2
                          style={{
                            fontFamily: "'Noto Sans Devanagari', sans-serif",
                          }}
                          className="text-lg text-stone-900 font-bold"
                        >
                          {news.headline}
                        </h2>

                        <p
                          style={{
                            fontFamily: "'Noto Sans Devanagari', sans-serif",
                          }}
                          className="border-l-3 pl-2 my-2 border-green-600 py-2 text-sm font-bold text-stone-500"
                        >
                          {news.slug}
                        </p>
                        <div className="w-full">
                          <Link to={`${news.link}`}>
                            <Button
                              variant=""
                              className="w-full bg-blue-700 text-white hover:bg-blue-600 cursor-pointer"
                            >
                              Read at eKantipur
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

export default News;
