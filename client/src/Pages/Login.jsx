import BackNavigation from "@/Buttons/BackNavigation";
import HomeNavigation from "@/Buttons/HomeNavigation";
import { RouteHome, RouteSignup } from "@/helper/RouteNames";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/user.slice.js";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`${BASE_URL}/auth/login`, {
      email,
      password
    }, { withCredentials: true })
    .then((res) => {
    const user = res.data?.user || res.data;

    dispatch(setUser(user));

    navigate(RouteHome);
  })
    .catch((err) => console.log(err));
  };

  return (
    <div className="w-full-screen bg-stone-100 mx-auto flex items-center justify-center h-[100vh]">
     <div className="max-w-sm mx-auto mt-10 flex flex-col items-center justify-center bg-white shadow-xl border border-gray-200 rounded-2xl p-6">
  <h2 className="text-3xl font-bold text-indigo-700 mb-4">Login</h2>

  <form onSubmit={handleSubmit} className="w-full space-y-4">
    <div className="flex flex-col">
      <label htmlFor="email" className="font-medium text-sm text-gray-700 mb-1">
        Email:
      </label>
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="password" className="font-medium text-sm text-gray-700 mb-1">
        Password:
      </label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        className="bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
    </div>

    <div className="flex items-center justify-between pt-2">
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all duration-200"
      >
        Login
      </button>
      <button
        type="reset"
        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-all duration-200"
      >
        Reset
      </button>
    </div>
  </form>

  <div className="mt-6 text-center">
    <p className="text-sm text-gray-600">
      Don't have an account?
      <Link
        to={RouteSignup}
        className="ml-1 text-indigo-600 font-semibold hover:underline"
      >
        Signup →
      </Link>
    </p>
  </div>
</div>

      <BackNavigation />
      <HomeNavigation />
    </div>
  );
};

export default Login;
