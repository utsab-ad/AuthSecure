import { RouteIndex } from "@/helpers/RouteNames";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Hireme = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    email: "",
    category: "",
    contact: "",
    noOfEmployees: "",
    description: "",
    source: "",
  });

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/hireme/request`,
        {
          companyName: formData.companyName,
          address: formData.address,
          category: formData.category,
          email: formData.email,
          contact: formData.contact,
          noOfEmployees: formData.noOfEmployees,
          description: formData.description,
          source: formData.source,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      navigate(RouteIndex);
    } catch (err) {
      toast.error(err);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <h2
          className="text-center font-bold text-indigo-700 mb-6"
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
          }}
        >
          {formData.category} Offer Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <input
            type="text"
            name="companyName"
            placeholder="Company Name / Your Name"
            value={formData.companyName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            required
          />

          <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
            >
              Select Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              required
            >
              <option value="">Select an option</option>
              <option value="Internship">Internship</option>
              <option value="Job">Job</option>
              <option value="Remote">Remote</option>
              <option value="Part Time">Part Time</option>
            </select>
          </div>

          <input
            type="number"
            name="noOfEmployees"
            placeholder="Number of Employees"
            value={formData.noOfEmployees}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            required
          />

          <div className="sm:col-span-2">
            <textarea
              name="description"
              placeholder="Company Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}
            >
              How did you find me?
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              required
            >
              <option value="">Select an option</option>
              <option value="linkedin">LinkedIn</option>
              <option value="github">GitHub</option>
              <option value="facebook">Facebook</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2 bg-indigo-100 p-4 border-l-4 border-indigo-500">
            <h3
              className="font-semibold text-indigo-700 mb-2"
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)" }}
            >
              Why you should hire me?
            </h3>
            <p
              className="text-gray-800"
              style={{ fontSize: "clamp(0.9rem, 2vw, 1.1rem)" }}
            >
              I bring a solid foundation in full-stack development, driven by a
              desire for continual growth and excellence. With a proactive
              approach, adaptability to new challenges, and clear communication
              skills, I thrive in collaborative environments. I’m dedicated to
              delivering clean, scalable solutions that align with project
              goals, making me a valuable addition to your team.
            </p>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 text-white py-3 rounded font-medium hover:bg-indigo-700 transition duration-200 text-sm sm:text-base"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hireme;
