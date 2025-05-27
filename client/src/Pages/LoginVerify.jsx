
import {RouteIndex, RouteLoginVerify } from "@/helper/RouteNames";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/user.slice.js";
import BackNavigation from "@/Buttons/BackNavigation.jsx";
import HomeNavigation from "@/Buttons/HomeNavigation.jsx";

const LoginVerify = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/otp/verify`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      )
      .then((res) => {
        const user = res.data?.user || res.data;

        dispatch(setUser(user));

        navigate(RouteIndex);
      })
      .catch((err) => console.log(err));
  };
  const handleResendOTP = (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
    email,
    password
    }, { withCredentials: true })
    .then((res) => {

    navigate(RouteLoginVerify, { state: { email, password }});
  })
    .catch((err) => console.log(err));
  };

  return (
    <div className="w-full-screen bg-stone-100 mx-auto flex items-center justify-center h-[100vh]">
      <div className="max-w-sm mx-auto mt-10 flex flex-col items-center justify-center bg-white shadow-xl border border-gray-200 rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">OTP Verification</h2>
        <div className="w-[80%] flex justify-center items-center pb-2">
          <p className="text-sm  text-center">Please check your email and paste the OTP for Login</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="font-medium text-sm text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="font-medium text-sm text-gray-700 mb-1"
            >
              Otp:
            </label>
            <input
              type="number"
              name="otp"
              placeholder="Enter Your OTP"
              required
              onChange={(e) => setOtp(e.target.value)}
              className="bg-gray-100 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="cursor-pointer w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all duration-200"
            >
              Verify
            </button>
          </div>
        </form>

  <div className="mt-6 text-center">
    <p className="text-sm text-gray-600">
      <button
        onClick={handleResendOTP}
        className="ml-1 text-indigo-600 font-semibold hover:underline cursor-pointer"
      >
        Resend OTP →
      </button>
    </p>
  </div>

      </div>

      <BackNavigation />
      <HomeNavigation />
    </div>
  );
};

export default LoginVerify;
