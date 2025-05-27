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
    budget: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Send form data to backend or API
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Landing Page Request Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
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
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          <input
            type="text"
            name="company"
            placeholder="Company Name (Optional)"
            value={formData.company}
            onChange={handleChange}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category of Landing Page</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

          <div className="md:col-span-2">
            <textarea
              name="description"
              placeholder="Brief description about the landing page goals and expectations"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="4"
              required
            />
          </div>

          <div className="md:col-span-2">
            <textarea
              name="objective"
              placeholder="What is the main objective of the page (Call to action, conversion, info)?"
              value={formData.objective}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
            />
          </div>

          <div className="md:col-span-2">
            <textarea
              name="features"
              placeholder="List any specific features or sections you want included (e.g. testimonials, gallery, newsletter, etc.)"
              value={formData.features}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows="3"
            />
          </div>

          <input
            type="text"
            name="deadline"
            placeholder="When do you want this delivered? (e.g. 2 weeks, 15 June 2025)"
            value={formData.deadline}
            onChange={handleChange}
            className="md:col-span-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="text"
            name="budget"
            placeholder="What is your budget range? (e.g. $100 - $300)"
            value={formData.budget}
            onChange={handleChange}
            className="md:col-span-2 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPageForm;
