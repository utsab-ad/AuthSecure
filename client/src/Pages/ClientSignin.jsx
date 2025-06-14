import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginClient } from "../redux/clientSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { RouteClientSignup, RouteIndex } from "@/helpers/RouteNames";

const ClientSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isClient, error, loading } = useSelector((state) => state.client);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginClient({ email, password }));
  };

  useEffect(() => {
    if (isClient) {
      toast.success("Client logged in successfully ✅");
      navigate(RouteIndex);
    }
    if (error) {
      toast.error(error);
    }
  }, [isClient, error, navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full pt-6 max-w-sm md:max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Client Login</h2>
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
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? "Logging in..." : "Continue"}
          </button>

          {isClient && (
            <p className="text-green-600 text-sm text-center mt-2">
              Client access granted ✅
            </p>
          )}

<h4 className="flex flex-col items-center jutify-center text-center">
  <p className="text-sm text-gray-500">Not registered ?</p>
  <Link className="text-sm text-blue-700" to={RouteClientSignup}>
  Register</Link>
</h4>

        </form>
      </div>
    </div>
  );
};

export default ClientSignin;