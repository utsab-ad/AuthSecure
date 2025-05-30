import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Make sure you have moment installed
import { IoMdArrowRoundBack } from "react-icons/io";

const TrackApplication = () => {
  const [email, setEmail] = useState("");
  const [app, setApp] = useState(false);
  const [otp, setOtp] = useState("");
  const [dbtn, setDbtn] = useState(false);
  const [appData, setAppData] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/forms/track-app`,
        { email },
        { withCredentials: true }
      )
      .then((result) => {
        if (result?.data) {
          setAppData(result.data); // Save application data
          setApp(true); // Show the card
          setError(""); // Clear any previous error
        } else {
          setError("No application found.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Something went wrong.");
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    setDbtn(true);
    setApp(false); 
  };

  return (
    <div className="relative mt-5 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl relative z-20">
        <form onSubmit={handleSubmit} className="">
          <input
            type="email"
            name="email"
            placeholder="Enter your email to track"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 bg-white mb-3 w-full border border-gray-300 rounded focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded font-medium hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
            >
              Track Offer Details
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      {dbtn && (
        <div className="fixed inset-0 mx-3 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="absolute z-30 max-w-md w-full bg-white rounded shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-indigo-700">
              Delete Offer !
            </h2>

            <form className="">
              <input
                type="number"
                name="otp"
                placeholder="Enter OTP to Delete"
                value={email}
                required
                onChange={(e) => setOtp(e.target.value)}
                className="p-3 bg-white mb-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              />
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-red-500 text-white py-3 rounded font-medium hover:bg-red-600 transition duration-200 text-sm sm:text-base"
                >
                  Delete
                </button>
              </div>
            </form>
            <button
              onClick={() => setDbtn(false)}
              className="mt-6 w-full text-red-500 rounded hover:text-red-600 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal Card */}
      {app && appData && (
        <div className="fixed inset-0 mx-3 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="absolute z-30 max-w-md w-full bg-white rounded shadow-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-indigo-700">
              Application Details
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Company:</span>{" "}
                {appData.companyName}
              </p>
              <p>
                <span className="font-medium">Category:</span>{" "}
                {appData.category}
              </p>
              <p>
                <span className="font-medium">Email:</span> {appData.email}
              </p>
              <p>
                <span className="font-medium">Address:</span> {appData.address}
              </p>
              <p>
                <span className="font-medium">Contact:</span> {appData.contact}
              </p>
              <p>
                <span className="font-medium">Submitted:</span>{" "}
                {moment(appData.createdAt).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="sm:col-span-2">
              <button
                onClick={handleDelete}
                className=" mt-6 cursor-pointer w-full bg-red-500 text-white py-3 rounded font-medium hover:bg-red-600 transition duration-200 text-sm sm:text-base"
              >
                Delete Offer
              </button>
            </div>
            <button
              onClick={() => setApp(false)}
              className="mt-6 w-full text-red-500 rounded hover:text-red-600 cursor-pointer"
            >
              Close
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
        <p className="text-sm text-gray-700">Delete feature is On the way ! and other features are Comming Soon</p>
      </div>

    </div>
  );
};

export default TrackApplication;
