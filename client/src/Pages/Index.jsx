import { Button } from "@/components/ui/button";
import { RouteChatbot } from "@/helpers/RouteNames";
import React from "react";
import { Link } from "react-router-dom";
import { RiChatVoiceAiFill } from "react-icons/ri";
import { Sidebar } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <div className="">
     <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-indigo-700 leading-tight mb-4">
            Hi, I'm Utsab 👋
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            A passionate IT student from Nepal 🇳🇵
            <br />
            specializing in backend development. Focused on real-world
            applications involving RESTful APIs, authentication, and database
            management.
          </p>
          <div className="flex ttems-center justify-evenly gap-3">
            <button
              // onClick={() => setShowHireModal(true)}
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-indigo-700 hover:to-purple-600 text-white font-semibold py-3 px-2 md:px-6 rounded-lg shadow-lg transition duration-300"
            >
              Hire Me
            </button>
            <button
              // onClick={() => setShowCreateModal(true)}
              className="inline-block border-2 border-indigo-500 text-indigo-700 hover:text-white hover:bg-indigo-500 font-semibold py-3 px-2 md:px-6 rounded-lg shadow-lg transition duration-300"
            >
              Lets Create
            </button>

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
    </div>
  );
};

export default Index;
