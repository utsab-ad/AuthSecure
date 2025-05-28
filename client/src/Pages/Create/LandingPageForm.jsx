import React, { useState } from "react";

const LandingPageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    company: "",
    category: "",
    description: "",
    objective: "",
    features: "",
    deadline: "",
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Send to backend
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="form-heading text-center mb-8">
          Landing Page Request Form
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name (Optional)"
            value={formData.company}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <div className="md:col-span-2">
            <label className="form-label">Category of Landing Page</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              required
            >
              <option value="">Select a category</option>
              <option value="personal">Personal Portfolio</option>
              <option value="startup">Startup/Business</option>
              <option value="product">Product Showcase</option>
              <option value="event">Event Promotion</option>
              <option value="nonprofit">Non-profit/NGO</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <textarea
              name="description"
              placeholder="Brief description about the landing page goals and expectations"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <textarea
              name="objective"
              placeholder="Main objective of the page (CTA, conversion, info)"
              value={formData.objective}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              rows="3"
            />
          </div>

          <div className="sm:col-span-2">
            <textarea
              name="features"
              placeholder="Specific features you want (e.g. testimonials, gallery)"
              value={formData.features}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
              rows="3"
            />
          </div>

          <input
            type="text"
            name="deadline"
            placeholder="Preferred deadline (e.g. 15 June 2025)"
            value={formData.deadline}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

          <input
            type="text"
            name="budget"
            placeholder="Budget range (e.g. $100 - $300)"
            value={formData.budget}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
          />

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

export default LandingPageForm;
