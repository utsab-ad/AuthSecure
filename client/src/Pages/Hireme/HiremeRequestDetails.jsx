import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaShareAlt } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RouteHiremeRequests } from "@/helper/RouteNames";
import Toast from "@/components/ui/Toast";

const HiremeRequestDetails = () => {
  const user = useSelector((state) => state.user);
  const { requestid } = useParams();
  const [createdDate, setCreatedDate] = useState("");
  const [companyName, setCompanyname] = useState("");
  const [contact, setContact] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [type, setType] = useState("");

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/requests/get-request/` + requestid
      )
      .then((request) => {
        setId(request.data._id);
        setCompanyname(request.data.companyName);
        setEmail(request.data.email);
        setNoOfEmployees(request.data.noOfEmployees);
        setAddress(request.data.address);
        setContact(request.data.contact);
        setCategory(request.data.category);
        setStatus(request.data.status);
        setDescription(request.data.description);
        setCreatedDate(
          moment(request.data.createdAt).format("DD MMM YYYY hh:mm A")
        );
      })
      .catch((err) => console.log(err));
  }, []);

  const handleShare = async () => {
    const shareData = {
      companyName,
      text: ` Offer from : ${companyName}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Failed to copy link.");
        console.error("Clipboard error:", err);
      }
    }
  };

  const handleAccept = async (e) => {

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/accept`,
        {
          email: email,
          id: id,
        },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setType(res.data.success ?? false);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setType(false);
    }
  };

  const handleDelete = (requestid) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/requests/delete/${requestid}`
      )
      .then(() => navigate(RouteHiremeRequests))
      .catch((err) => console.error(err));
  };

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
    <main className="w-full px-4 md:px-12 py-8 max-w-6xl mx-auto">
      <header className="mb-8 text-center">
        <h2
          className="text-center font-bold text-indigo-700"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
          }}
        >
          {category} Offer !
        </h2>
        <p className="text-sm text-gray-500 dark:text-indigo-400 mt-2">
          Offer from a company with {noOfEmployees} employes
        </p>
      </header>

      <div className="flex justify-between gap-2 mb-4">
        <StatusBadge status={status} />

        <Button
          onClick={handleShare}
          variant="outline"
          className="p-2 hover:bg-gray-100 transition dark:hover:text-black"
        >
          <FaShareAlt className="text-lg" />
        </Button>
      </div>

      <div className="mb-6 text-sm md:text-base text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-semibold">Company/Name:</span> {companyName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {email}
        </p>
        <p>
          <span className="font-semibold">Contact:</span> {contact}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {address}
        </p>
        <p>
          <span className="font-semibold">Category:</span> {category}
        </p>
        <p>
          <span className="font-semibold">Offer Submitted at:</span>{" "}
          {createdDate}
        </p>
      </div>

      <p className="blog-content prose prose-lg dark:prose-invert max-w-none">
        <span className="font-semibold">Description</span> <br />
        {description}
      </p>

      {user?.isLoggedIn ? (
        <>
          <div className={`md:grid md:grid-cols-2 gap-3 sm:col-span-2 mt-3`}>
            <button
              onClick={() => handleAccept()}
              className={`${status == "accepted" ? "hidden" : "block"} cursor-pointer w-full mb-3 bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition duration-200 text-sm sm:text-base`}
            >
              Accept
            </button>
            <button
              onClick={() => handleDelete(requestid)}
              className="cursor-pointer w-full mb-3 bg-red-600 text-white py-3 rounded font-medium hover:bg-red-700 transition duration-200 text-sm sm:text-base"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
      <Toast message={message} type={type} onClose={() => setMessage("")} />
    </main>
  );
};

export default HiremeRequestDetails;
