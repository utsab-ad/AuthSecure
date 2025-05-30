import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import moment from "moment";
import { HiPencilAlt } from "react-icons/hi";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { RouteRequestDetail } from "@/helper/RouteNames";

const HiremeRequests = () => {
  const user = useSelector((state) => state.user);
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/requests/`)
      .then((result) => setRequests(result.data))
      .catch((err) => console.error(err));
  }, []);

  const StatusBadge = ({ status }) => {
    const getStatusStyle = (status) => {
      switch (status.toLowerCase()) {
        case "pending":
          return "bg-yellow-200 text-yellow-800";
        case "accepted":
          return "bg-green-200 text-green-800";
        case "rejected":
          return "bg-red-200 text-red-800";
        default:
          return "bg-gray-200 text-gray-800";
      }
    };

    return (
      <div
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(
          status
        )}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  return (
    <div className="px-4 md:px-10 lg:px-16 py-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.map((request) => (
          <div
            key={request._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-indigo-700">
                  {request.category}
                </h3>
                <StatusBadge status={request.status} />
              </div>

              <p className="text-gray-700 text-sm leading-relaxed">
                Email: {request.email}
              </p>
            </div>
            <Link
              to={RouteRequestDetail(request._id)}
              className="inline-block w-fit text-sm font-medium  text-blue-600 px-4 py-2 rounded-md hover:text-blue-700 transition"
            >
              view →
            </Link>

            <div className="flex justify-between items-center p-4 border-t border-gray-100">
              <time className="text-sm text-gray-500 font-medium">
                {moment(request.createdAt).format("DD MMM YYYY")}
              </time>

              <p className="text-sm text-gray-600 dark:text-white font-medium">
                {request.companyName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiremeRequests;
