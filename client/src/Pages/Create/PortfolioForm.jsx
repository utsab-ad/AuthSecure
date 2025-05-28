import React, { useState } from "react";

const PortfolioPageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    profession: "",
    goals: "",
    sections: "",
    theme: "",
    links: "",
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
    // Send to backend or display confirmation
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h2 className="form-heading text-center mb-8">
          Portfolio Page Request Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="profession"
            placeholder="Your Profession (e.g., Web Developer)"
            value={formData.profession}
            onChange={handleChange}
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"

            required
          />

          <div className="sm:col-span-2">
          <textarea
            name="goals"
            placeholder="What do you want to achieve with your portfolio?"
            value={formData.goals}
            onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"

            rows="3"
            required
          />
          </div>

          <div className="sm:col-span-2">
          <textarea
            name="sections"
            placeholder="Sections you want included (e.g. projects, resume, contact form, testimonials)"
            value={formData.sections}
            onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"

            rows="3"
            required
          />
          </div>

          <input
            type="text"
            name="theme"
            placeholder="Preferred theme or color style (Optional)"
            value={formData.theme}
            onChange={handleChange}
                       className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"

          />

          <div className="sm:col-span-2">
          <textarea
            name="links"
            placeholder="Any existing links (GitHub, LinkedIn, Resume, etc.)"
            value={formData.links}
            onChange={handleChange}
                         className="w-full p-3 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"

            rows="3"
          />
          </div>

          <input
            type="text"
            name="deadline"
            placeholder="Preferred deadline (e.g., 20 June 2025)"
            value={formData.deadline}
            onChange={handleChange}
                       className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"

          />

          <input
            type="text"
            name="budget"
            placeholder="Estimated budget (e.g., $50 - $150)"
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

export default PortfolioPageForm;
