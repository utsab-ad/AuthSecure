import axios from "axios";
import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { RouteProgress } from "@/helpers/RouteNames";


const editorConfig = {
  readonly: false,
  theme: "dark",
  toolbarButtonSize: "small",
  height: 400,
  style: {
    background: "#1f2937",
    color: "#e5e7eb", 
    borderRadius: "0.5rem",
    padding: "1rem",
  },
  toolbarAdaptive: false,
  showCharsCounter: false,
  showWordsCounter: false,
  showXPathInStatusbar: false,
  placeholder: "Write your content or code here...",

  buttons: [
    "bold", "italic", "underline", "strikethrough", "|",
    "ul", "ol", "|",
    "outdent", "indent", "|",
    "font", "fontsize", "brush", "paragraph", "|",
    "table", "link", "image", "|",
    "left", "center", "right", "justify", "|",
    "undo", "redo", "|",
    "source", "code", "|",
    "hr", "eraser", "fullsize"
  ],

  iframeStyle: `
    body {
      background-color: #1f2937 !important;
      color: #e5e7eb !important;
      font-family: 'Fira Code', monospace;
    }

    pre, code {
      background-color: #111827;
      color: #10b981;
      padding: 8px;
      display: block;
      border-radius: 6px;
      font-family: 'Fira Code', monospace;
      font-size: 0.875rem;
      overflow-x: auto;
    }
  `,
};


const ProgressCreate = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [investedTime, setInvestedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/progress/create`,
        {
          title,
          slug,
          author,
          content,
          investedTime,
        },
        { withCredentials: true }
      );

      toast.success(data.message || "Progress created successfully 🎉");
      setTimeout(() => navigate(RouteProgress), 1000);
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setSlug("");
    setAuthor("");
    setContent("");
    setInvestedTime("");
  };

  return (
    <div className="w-full p-4 bg-slate-900 min-h-screen text-slate-100">
      <Card className="md:w-screen max-w-3xl mx-auto bg-slate-800 shadow-lg border border-slate-700 p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-slate-100">
            📝 Create Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="text-sm font-medium text-slate-300"
              >
                Title
              </label>
              <input
                id="title"
                className="w-full px-3 py-2 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter title..."
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="slug"
                className="text-sm font-medium text-slate-300"
              >
                Slug
              </label>
              <input
                id="slug"
                className="w-full px-3 py-2 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="URL-friendly slug"
                value={slug}
                required
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>

            {/* Author */}
            <div>
              <label
                htmlFor="author"
                className="text-sm font-medium text-slate-300"
              >
                Author
              </label>
              <input
                id="author"
                className="w-full px-3 py-2 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Your name"
                value={author}
                required
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            {/* Invested Time */}
            <div>
              <label
                htmlFor="investedTime"
                className="text-sm font-medium text-slate-300"
              >
                Invested Time
              </label>
              <input
                id="investedTime"
                className="w-full px-3 py-2 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="e.g. 5 hours"
                value={investedTime}
                required
                onChange={(e) => setInvestedTime(e.target.value)}
              />
            </div>

            {/* Content */}
            <div>
              <label
                htmlFor="content"
                className="text-sm font-medium text-slate-300 mb-1 block"
              >
                Content
              </label>
              <div className="bg-slate-700 border border-slate-600 rounded-lg text-black">
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={editorConfig}
                  onBlur={(newContent) => setContent(newContent)}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-4">
              <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                {loading ? "Creating..." : "Create"}
              </Button>
              <Button
                type="reset"
                variant="outline"
                onClick={handleReset}
                className="border border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
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

export default ProgressCreate;
