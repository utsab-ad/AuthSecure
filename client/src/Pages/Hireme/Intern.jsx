import BackNavigation from "@/Buttons/BackNavigation";
import HomeNavigation from "@/Buttons/HomeNavigation";
import React, { useState } from "react";

const Intern = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    email: "",
    contact: "",
    noOfEmployees: "",
    description: "",
    source: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Post to backend if required
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Internship Offer Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="number"
            name="noOfEmployees"
            placeholder="Number of Employees"
            value={formData.noOfEmployees}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Company Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How did you find me?
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            >
              <option value="">Select an option</option>
              <option value="linkedin">LinkedIn</option>
              <option value="github">GitHub</option>
              <option value="facebook">Facebook</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="md:col-span-2 bg-indigo-50 border-l-4 border-indigo-400 p-5 rounded-xl">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              Why you should hire me?
            </h3>
            <p className="text-gray-700">
              I bring a solid foundation in full-stack development, driven by a
              desire for continual growth and excellence. With a proactive
              approach, adaptability to new challenges, and clear communication
              skills, I thrive in collaborative environments. I’m dedicated to
              delivering clean, scalable solutions that align with project
              goals, making me a valuable addition to your team.
            </p>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Intern;
