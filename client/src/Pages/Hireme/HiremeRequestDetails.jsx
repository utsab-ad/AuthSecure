import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { FaShareAlt } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RouteHiremeRequests } from "@/helper/RouteNames";

const HiremeRequestDetails = () => {
  const user = useSelector((state) => state.user);
  const { requestid } = useParams();
  const [createdDate, setCreatedDate] = useState("");
  const [companyName, setCompanyname] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/requests/get-request/` + requestid
      )
      .then((request) => {
        setCompanyname(request.data.companyName);
        setEmail(request.data.email);
        setNoOfEmployees(request.data.noOfEmployees);
        setAddress(request.data.address);
        setContact(request.data.contact);
        setCategory(request.data.category);
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

  const handleDelete = (requestid) => {
    axios
      .delete(
        `${import.meta.env.VITE_API_BASE_URL}/requests/delete/${requestid}`
      )
      .then(() => navigate(RouteHiremeRequests))
      .catch((err) => console.error(err));
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

      <div className="flex justify-end gap-2 mb-4">
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
          <div className="md:grid md:grid-cols-2 gap-3 sm:col-span-2 mt-3">
            <button className="cursor-pointer w-full mb-3 bg-green-600 text-white py-3 rounded font-medium hover:bg-green-700 transition duration-200 text-sm sm:text-base">
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
    </main>
  );
};

export default HiremeRequestDetails;
