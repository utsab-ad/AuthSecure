import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

const News = () => {
  const [newses, setNews] = useState([]);

  try {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/news/new`)
      .then((result) => {
        setNews(result.data.news);
      });
  } catch (error) {
    console.log(error);
  }

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

        <div className="px-4 flex justify-evenly items-center pb-3">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Source</SelectLabel>
                <SelectItem value="apple">Kantipur</SelectItem>
                <SelectItem value="banana">The Kathmandu Post</SelectItem>
                <SelectItem value="blueberry">BBC</SelectItem>
                <SelectItem value="grapes">GorkhaPatra</SelectItem>
                <SelectItem value="pineapple">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="apple">National</SelectItem>
                <SelectItem value="banana">Sports</SelectItem>
                <SelectItem value="blueberry">Tech</SelectItem>
                <SelectItem value="grapes">Political</SelectItem>
                <SelectItem value="pineapple">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex pb-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 px-3 justify-center items-center gap-3 pt-5 flex-col mx-auto">
        {newses &&
          newses.map(news => <>
           {news.headline && news.slug && news.link && news.image &&  <card className="flex flex-col border bg-white rounded-lg mx-auto p-3 max-w-100">
              <h2 className="text-lg text-stone-900 font-bold">
                {news.headline}
              </h2>
              <div className="">
                <img src={news.image} className="rounded-xl" alt="image" />
              </div>

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
                </Button></Link>
              </div>
            </card>}
          </>)}
      </div>
    </div>
  );
};

export default News;
