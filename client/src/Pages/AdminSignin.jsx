import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/adminSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { RouteClientSignin, RouteIndex } from "@/helpers/RouteNames";
import { FaArrowRight } from "react-icons/fa6";
import HomeButton from "@/components/HomeButton";

const AdminSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAdmin, error, loading, message } = useSelector(
    (state) => state.admin
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };

  useEffect(() => {
    if (isAdmin) {
      toast.success("Admin access granted ✅");
      navigate(RouteIndex);
    }
    if (error) {
      toast.error(error);
    }
  }, [isAdmin, error, navigate]);

  return (
    <div className="flex flex-col items-center p-6 justify-center min-h-[100vh] my-auto md:p-10">
      <div className="w-full pt-6 max-w-sm md:max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <h4 className="flex flex-col items-end pt-3 jutify-center text-right">
          <Link
            className=" flex  items-center gap-2 text-right hover:text-blue-500 text-sm text-blue-600"
            to={RouteClientSignin}
          >
            Client Login <FaArrowRight />
          </Link>
        </h4>
      </div>
      <HomeButton/>
    </div>
  );
};

export default AdminSignin;
