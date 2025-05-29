import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment"; // Make sure you have moment installed

const TrackApplication = () => {
  const [email, setEmail] = useState("");
  const [app, setApp] = useState(false);
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

  return (
    <div className="relative min-h-[90vh] bg-white flex items-center justify-center px-4 py-8">
     

      <div className="w-full max-w-4xl relative z-20">
        <form
          onSubmit={handleSubmit}
          className=""
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email to track"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mb-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded font-medium hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
            >
              Track Application
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

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
              <span className="font-medium">Category:</span> {appData.category}
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
          <button
            onClick={() => setApp(false)}
            className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default TrackApplication;
