import FileCounter from "@/Components/FileCounter";
import GitHubActivity from "@/Components/GitHubActivity";
import Languages from "@/Components/Languages";
import LatestBlog from "@/Components/LatestBlog";
import ProjectIndex from "@/Components/ProjectsIndex";
import { RouteIntern, RouteLandingPageForm, RouteLogin } from "@/helper/RouteNames";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuLogOut } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const [showHireModal, setShowHireModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-100 to-white dark:from-gray-900 dark:via-slate-800 dark:to-gray-950 text-gray-800 dark:text-white font-sans transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-700 leading-tight mb-4">
            Hi, I'm Utsab 👋
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-white mb-6">
            A passionate IT student from Nepal 🇳🇵
            <br />
            specializing in backend development. Focused on real-world
            applications involving RESTful APIs, authentication, and database
            management.
          </p>
          <div className="flex ttems-center justify-evenly gap-3">
            <button
              onClick={() => setShowHireModal(true)}
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-indigo-700 hover:to-purple-600 text-white font-semibold py-3 px-2 md:px-6 rounded-lg shadow-lg transition duration-300"
            >
              Hire Me
            </button>
            {showHireModal && (
              <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Choose an Option
                  </h3>
                  <div className="flex flex-col gap-4">
                    <Link
                      to={RouteIntern}
                      className="cursor-pointer bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
                    >
                      Intern
                    </Link>
                    <button className="cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                      Job
                    </button>
                    <button className="cursor-pointer bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                      Remote
                    </button>
                  </div>
                  <button
                    onClick={() => setShowHireModal(false)}
                    className="text-red-500  py-2 rounded-lg hover:text-red-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-block border-2 border-indigo-500 text-indigo-700 hover:text-white hover:bg-indigo-500 font-semibold py-3 px-2 md:px-6 rounded-lg shadow-lg transition duration-300"
            >
              Lets Create
            </button>

            {showCreateModal && (
              <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Choose an Option
                  </h3>
                  <div className="flex flex-col gap-4">
                    <Link
                   to={RouteLandingPageForm} 
                    className="cursor-pointer bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600">
                      Landing Page
                    </Link>
                    <button className="cursor-pointer bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                      Portfolio
                    </button>
                    <button className="cursor-pointer bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
                      Business Site
                    </button>
                    <button className="cursor-pointer bg-stone-500 text-white py-2 rounded-lg hover:bg-stone-600">
                      E - Commerce
                    </button>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-red-500  py-2 rounded-lg hover:text-red-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="https://github.com/shadcn.png"
            alt="Utsab's Profile"
            className="w-72 h-72 rounded-full object-cover border-4 border-blue-300 shadow-lg transition duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className=" mx-2 py-3">
        <LatestBlog />
      </div>

      <div id="lang" className="mx-2">
        <Languages />
      </div>

      <div id="projects" className="mx-2 my-3">
        <ProjectIndex />
      </div>

      <div className="flex flex-col justify-center items-center p-2 md:block hidden">
        <h3 className="font-bold text-indigo-700 dark:text-white text-xl text-center">
          Github Contribution Graph
        </h3>
        <GitHubActivity />
      </div>
      <div id="projects">
        <FileCounter />
      </div>
    </div>
  );
};

export default Index;
