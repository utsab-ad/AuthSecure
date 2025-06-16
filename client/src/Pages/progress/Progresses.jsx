import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { HiPencilAlt } from "react-icons/hi";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { RouteProgressCreate, RouteProgressDetail } from "@/helpers/RouteNames";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Progresses = () => {
  const [progresses, setProgresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/progress/get-all`, {
        withCredentials: true,
      })
      .then((res) => setProgresses(res.data))
      .catch((err) => console.error("Failed to fetch progresses", err));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this progress?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/progress/${id}`,
        {
          withCredentials: true,
        }
      );
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
        <Table>
          <TableCaption>A list of Progresses</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className=""></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {progresses.map((progress) => (
              <TableRow key={progress._id || progress.slug}>
                <TableCell className="font-medium">{progress.title}</TableCell>
                <TableCell>
                  {moment(progress.createdAt).format("DD-MM-YYYY hh:mm A")}
                </TableCell>
                <TableCell className="flex text-right gap-2">
                  <Button
                    size="icon"
                    className="bg-green-500 text-black hover:bg-green-700"
                    onClick={() =>
                      navigate(`/dashboard/progress/edit/${progress._id}`)
                    }
                    aria-label={`Edit ${progress.title}`}
                  >
                    <HiPencilAlt className="text-gray-300" />
                  </Button>
                  <Button
                    className="bg-red-500 text-black hover:bg-red-700"
                    size="icon"
                    onClick={() => handleDelete(progress._id)}
                    aria-label={`Delete ${progress.title}`}
                  >
                    <FaTrashAlt className="text-white text-sm" />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    className="w-full bg-blue-700 hover:bg-blue-800 text-white"
                    onClick={() => navigate(RouteProgressDetail(progress._id))}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}></TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        </TableFooter> */}
        </Table>
      )}
    </section>
  );
};

export default Progresses;
