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

const Ekantipur = () => {
  const [newses, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/news/ekantipur`
        );
        setNews(response.data.news);
      } catch (error) {
        console.log(error);
      }
    };
    getNews();
  }, []);

  return (
    <div className="">
      <div>
        <div className="p-4 flex justify-center items-center flex-col text-center">
          <h1 className="text-2xl font-bold text-stone-800">📰 eKantipur</h1>
          <p className="text-stone-500 text-sm max-w-xl">
            You can read latest <strong>news </strong> from{" "}
            <strong>eKantipur</strong> to stay informed.
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center p-2 mb-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link className="text-gray-300 font-bold">
              <Button>
                eKantipur
                <IoIosArrowForward size={24} />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Official Site</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex pb-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-3 justify-center items-start gap-3 pt-5 flex-col mx-auto">
        {newses &&
          newses.map((news) => (
            <>
              {news.headline && news.slug && news.image && news.link && (
                <card className="flex flex-col border bg-white rounded-lg mx-auto p-3 max-w-100">
                  <h2
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
                    className="text-lg text-stone-900 font-bold"
                  >
                    {news.headline}
                  </h2>
                  <div className="">
                    <img src={news.image} className="rounded-xl" alt="image" />
                  </div>

                  <p
                    style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
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
                </card>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Ekantipur;

//Ekantipur
