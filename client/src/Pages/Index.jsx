import { RouteHome, RouteLogin, RouteSignup } from "@/helper/RouteNames.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="bg-stone-100 w-full-screen min-h-[100vh]">
    <div className="w-full-screen h-full-screen">
     <div className="w-full bg-indigo-50 py-10 px-6 text-center shadow-sm border-b border-indigo-200">
  <h1 className="text-4xl font-bold text-indigo-700">Welcome to AuthSecure</h1>
  <p className="text-gray-600 mt-2 text-sm sm:text-base">
    A secure authentication system built with MERN stack.
  </p>
</div>

      <div className="flex justify-center gap-8 items-center w-full p-4">
        <Link
          to={RouteLogin}
          className="border border-black bg-stone-900 cursor-pointer
       text-white py-1 rounded px-3 hover:bg-white hover:text-black font-semibold"
        >
          Login
        </Link>
        <Link
          to={RouteSignup}
          className="border border-blue-900 bg-blue-900 cursor-pointer
       text-white py-1 rounded px-3 hover:bg-white hover:text-blue-900 font-semibold"
        >
          Signup
        </Link>
      </div>
    </div>
    <div className="max-w-4xl mx-auto mt-2 mb-2 px-6 py-5 bg-white rounded-lg shadow-md border border-gray-200">
  <h2 className="text-2xl font-bold text-indigo-700 mb-2">About This Authentication System</h2>
  <p className="text-gray-700 text-sm leading-relaxed mb-4">
    This is a secure and user-friendly authentication system designed to manage user registration, login, session handling, and protected routes. It provides a scalable and modular backend built with modern technologies, ensuring both efficiency and security for full-stack applications.
  </p>

  <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2">🔧 Technologies Used</h3>
  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
    <li><span className="font-medium">Frontend:</span> React.js, Tailwind CSS, Axios</li>
    <li><span className="font-medium">Backend:</span> Node.js, Express.js</li>
    <li><span className="font-medium">Database:</span> MongoDB</li>
    <li><span className="font-medium">Authentication:</span> JSON Web Tokens (JWT), bcrypt for password hashing</li>
    <li><span className="font-medium">Cookies:</span> HttpOnly cookies for secure session handling</li>
    <li><span className="font-medium">Error Handling:</span> Custom error middleware</li>
  </ul>
  <p className="text-sm text-gray-600 mt-4 italic">
    Built with a focus on security, modularity, and a smooth user experience.
  </p>
</div>
<div className="w-full bg-white shadow-md rounded-lg mt-10 p-6 border border-gray-200">
  <h2 className="text-2xl font-bold text-indigo-700 mb-4">🔐 What’s Next?</h2>
  <p className="text-gray-600 mb-4">
  Here are a few key features I am planning to enhance security and improve user experience:
  </p>

  <ul className="list-disc list-inside text-gray-700 space-y-2">
    <li>
      <span className="font-semibold text-indigo-600">Email Verification:</span> Confirm user identity before full access.
    </li>
    <li>
      <span className="font-semibold text-indigo-600">Google Login (OAuth):</span> Fast and secure login using Google accounts.
    </li>
    <li>
      <span className="font-semibold text-indigo-600">Password Reset System:</span> Allow users to recover access safely.
    </li>
    <li>
      <span className="font-semibold text-indigo-600">Two-Factor Authentication (2FA):</span> Add an extra layer of protection.
    </li>
    <li>
      <span className="font-semibold text-indigo-600">Role-Based Access Control:</span> Restrict or grant permissions based on user type.
    </li>
  </ul>

  <p className="mt-6 text-sm text-gray-500">
    These features will further harden the system against vulnerabilities and provide a seamless experience for users.
  </p>
</div>

<Link
      to={RouteHome}
      className={`fixed ml-2 mt-2 pl-2 pt-2 left-0 hover:text-stone-600 top-0 cursor-pointer group`}
    >
              <p className='text-sm w-fit py-2 text-blue-600 hover:underline text-right'>Try to enter →</p>
              <div className="fixed ml-2 mt-1 pl-2 pt-2 left-0 hidden group-hover:block text-sm">
          accessible after login
        </div>
    </Link>
<footer className="w-full bg-black mt-3 py-2">
  <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-center items-center text-sm text-white">
    <p className="mb-2">
      © Copyright {new Date().getFullYear()} | Designed & Developed by Utsab Adhikari
    </p>
  </div>
</footer>
    </div>
  );
};

export default Index;
