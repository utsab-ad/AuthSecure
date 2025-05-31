import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Make sure you have moment installed
import { IoMdArrowRoundBack } from "react-icons/io";
import Toast from "@/components/ui/Toast";

const TrackApplication = () => {
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
      .get(`${import.meta.env.VITE_API_BASE_URL}/requests/offer-status`, {
        withCredentials: true,
      })
      .then((result) => {
        setCompanyname(result.data.companyName);
        setEmail(result.data.email);
        setNoOfEmployees(result.data.noOfEmployees);
        setAddress(result.data.address);
        setContact(result.data.contact);
        setCategory(result.data.category);
        setDescription(result.data.description);
        setCreatedDate(
          moment(result.data.createdAt).format("DD MMM YYYY hh:mm A")
        );
      });
  }, []);

  return (
    <div className="relative mt-5 flex flex-col items-center justify-center px-4 py-8">
          <div className=" max-w-md w-full bg-white rounded shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-indigo-700">
              Application Details
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Company:</span>{" "}
                {companyName}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {category}
              </p>
              <p>
                <span className="font-medium">Email:</span> {email}
              </p>
              <p>
                <span className="font-medium">Address:</span> {address}
              </p>
              <p>
                <span className="font-medium">Contact:</span> {contact}
              </p>
              <p>
                <span className="font-medium">Submitted:</span>{" "}
                {createdDate}
              </p>
            </div>
            <div className="sm:col-span-2">
              <button
                className=" mt-6 cursor-pointer w-full bg-red-500 text-white py-3 rounded font-medium hover:bg-red-600 transition duration-200 text-sm sm:text-base"
              >
                Delete Offer
              </button>
            </div>

        </div>
      <button
        onClick={() => navigate(-1)}
        className="fixed top-2 left-20 md:left-72 px-4 py-2 hover:text-stone-600"
      >
        <IoMdArrowRoundBack />
      </button>

      <div className="text-center flex items-center justify-center px-4 my-3">
        <p className="text-sm text-gray-700">
          Delete feature is On the way ! and other features are Comming Soon
        </p>
      </div>
    </div>
  );
};

export default TrackApplication;
