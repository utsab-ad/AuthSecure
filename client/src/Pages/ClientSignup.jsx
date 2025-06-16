import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerClient } from "../redux/clientSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { RouteClientSignin, RouteIndex } from "@/helpers/RouteNames";
import HomeButton from "@/components/HomeButton";

const ClientSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isClient, error, loading } = useSelector((state) => state.client);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(registerClient(formData));
  };

  useEffect(() => {
    if (isClient) {
      toast.success("Client registered successfully ✅");
      navigate(RouteIndex);
    }
    if (error) {
      toast.error(error);
    }
  }, [isClient, error, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] my-auto p-6 md:p-10">
      <div className="w-full pt-6 max-w-sm md:max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Client Signup</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="border px-3 py-2 rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border px-3 py-2 rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <h4 className="flex flex-col items-center jutify-center text-center">
            <p className="text-sm text-gray-500">Already registered ?</p>
            <Link className="text-sm text-blue-700" to={RouteClientSignin}>
              Login
            </Link>
          </h4>
        </form>
      </div>
      <HomeButton/>
    </div>
  );
};

export default ClientSignup;
