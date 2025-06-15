import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { HiPencilAlt } from "react-icons/hi";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { RouteProgressCreate, RouteProgressDetail } from "@/helpers/RouteNames";

const Progresses = () => {
  const [progresses, setProgresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/progress/get-all`, { withCredentials: true })
      .then((res) => setProgresses(res.data))
      .catch((err) => console.error("Failed to fetch progresses", err));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this progress?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/progress/${id}`, {
        withCredentials: true,
      });
      setProgresses((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <section className="px-4 md:px-10 lg:px-16 py-8 max-w-7xl mx-auto">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">My Progress Logs</h1>
        <Button
          onClick={() => navigate(RouteProgressCreate)}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Progress
        </Button>
      </header>

      {progresses.length === 0 ? (
        <p className="text-gray-500 text-center">No progress entries found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {progresses.map((progress) => (
            <div
              key={progress._id}
              className="bg-slate-900 text-white border border-slate-700 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-5 flex flex-col justify-between"
            >
              <div className="text-sm text-gray-400 mb-1">
                {moment(progress.createdAt).format("DD MMM YYYY")}
              </div>
              <h2
                className="text-lg font-semibold mb-2 line-clamp-2 cursor-pointer hover:underline"
                onClick={() => navigate(`/dashboard/progress/${progress._id}`)}
              >
                {progress.title}
              </h2>

              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-slate-800"
                  onClick={() => navigate(`/dashboard/progress/edit/${progress._id}`)}
                  aria-label={`Edit ${progress.title}`}
                >
                  <HiPencilAlt className="text-gray-300" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleDelete(progress._id)}
                  aria-label={`Delete ${progress.title}`}
                >
                  <FaTrashAlt className="text-white text-sm" />
                </Button>
              </div>

              <Button
                className="mt-4 w-full bg-blue-700 hover:bg-blue-800 text-white"
                onClick={() => navigate(RouteProgressDetail(progress._id))}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Progresses;
