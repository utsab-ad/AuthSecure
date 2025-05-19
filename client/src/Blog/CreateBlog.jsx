import axios from "axios";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Button } from "@/components/ui/button";
import { RouteBlogs } from "@/helper/RouteNames.js";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const navigate = useNavigate();  

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/blog/api/create-blog`, {
        title,
        slug,
        author,
        content,
      })
      .then(() => {
        navigate(RouteBlogs);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full p-2 mt-4">
      <Card className="md:w-screen max-w-3xl mx-auto bg-white shadow-lg border border-gray-300 p-4 rounded-xl transition-shadow hover:shadow-xl">
        <CardHeader />
        <CardHeader>
          <CardTitle className="flex justify-center items-center">
            <h3>Create A Blog</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={Submit}>
            <div className="flex flex-wrap p-2 items-center">
              <label className="text-sm" htmlFor="title">
                Title:
              </label>
              <input
                id="title"
                className="w-full px-2 rounded bg-gray-100"
                type="text"
                placeholder="Title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap p-2 items-center">
              <label className="text-sm" htmlFor="slug">
                Slug:
              </label>
              <input
                id="slug"
                className="w-full px-2 rounded bg-gray-100"
                type="text"
                placeholder="Slug"
                required
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap p-2 items-center">
              <label className="text-sm" htmlFor="slug">
                Author:
              </label>
              <input
                id="author"
                className="w-full px-2 rounded bg-gray-100"
                type="text"
                placeholder="Author"
                required
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap p-2 items-center">
              <label className="text-sm" htmlFor="content">
                Content:
              </label>

             <div id="content"  className="w-full px-2 rounded bg-gray-100">
               <JoditEditor
                ref={editor}
                required
                onChange={(newContent) => setContent(newContent)}
              />
             </div>
            </div>

            <div className="flex justify-end items-center gap-2 m-4">
              <Button
                variant="outline"
                type="submit"
                className="bg-green-600 text-white hover:bg-white hover:text-green-600 hover:border-green-600"
              >
                Create
              </Button>
              <Button
                variant="outline"
                type="reset"
                onClick={() => {
                  setTitle("");
                  setSlug("");
                  setAuthor("");
                  setContent("");
                }}
                className="bg-red-600 text-white hover:bg-white hover:text-red-600 hover:border-red-600"
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBlog;
