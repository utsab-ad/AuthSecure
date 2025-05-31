import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Make sure you have moment installed
import { IoMdArrowRoundBack } from "react-icons/io";
import Toast from "@/components/ui/Toast";
import { RouteHireme } from "@/helper/RouteNames";

const TrackApplication = () => {
  const [createdDate, setCreatedDate] = useState("");
  const [companyName, setCompanyname] = useState("");
  const [id, setId] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [noOfEmployees, setNoOfEmployees] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [deleteOpen, isDeleteOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/requests/offer-status`, {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result.data);
        setCompanyname(result.data.companyName);
        setId(result.data._id);
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

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/requests/delete-confirm`,
        {
          companyName: companyName,
          email: email,
        },
        { withCredentials: true }
      );

      console.log(id, companyName, email);

      setMessage(res.data.message || "Delete confirmed.");
      setType(res.data.success ?? false);
      isDeleteOpen(true);
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setType(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/otp/verify-delete-req`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      setMessage(res.data.message || "Delete confirmed.");
      setType(res.data.success ?? false);
      isDeleteOpen(false);
      navigate(RouteHireme);
    } catch (err) {
      console.error("Delete failed:", err);
      setMessage(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
      setType(false);
    }
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
    <>
      {email ? (
        <div className="relative mt-5 flex flex-col items-center justify-center px-4 py-8">
          <div className=" max-w-md w-full bg-white rounded shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-indigo-700">
              Application Details
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Company/Name:</span>{" "}
                {companyName}
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
              <p className="blog-content prose prose-lg dark:prose-invert max-w-none">
                <span className="font-semibold">Description</span> <br />
                {description}
              </p>

            </div>
            <div className="sm:col-span-2">
              <button
                onClick={handleDeleteConfirm}
                className=" mt-6 cursor-pointer w-full bg-red-500 text-white py-3 rounded font-medium hover:bg-red-600 transition duration-200 text-sm sm:text-base"
              >
                Delete Offer
              </button>
            </div>
          </div>

          {deleteOpen && (
            // <div
            //   className="w-full bg-white shadow-xl rounded-t-xl z-50 p-4 transition-all duration-500 ease-in-out animate-slide-up"
            // >
            <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-500 ease-in-out animate-slide-up">
              <div className="bg-white p-6 rounded shadow-lg w-80 text-center space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Confirm Deletion</h2>
                  <button
                    onClick={() => isDeleteOpen(false)}
                    className="text-red-500 hover:text-red-700 font-bold text-xl"
                  >
                    &times;
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  required
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <button
                  onClick={handleDelete}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

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
          <Toast message={message} type={type} onClose={() => setMessage("")} />
        </div>
      ) : (
        <div className="flex justify-center items-center mx-auto my-auto h-full">
        <p className="text-sm font-semibold">Data Not Found! </p>
        </div>
      )}
    </>
  );
};

export default TrackApplication;
