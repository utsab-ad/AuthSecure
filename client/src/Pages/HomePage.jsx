import { RouteIndex, RouteLogin } from "@/helper/RouteNames";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LuLogOut } from "react-icons/lu";
import { FaHome } from "react-icons/fa";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

 useEffect(() => {
  axios.get(`${import.meta.env.VITE_API_BASE_URL}/in/users`, { withCredentials: true })
    .then(result => {
      if (result.data && result.data.user) {
        setUsers(result.data.user);
      } else {
        navigate(RouteLogin);
      }
    })
    .catch((err) => {
      console.log("User not authenticated:", err);
      navigate(RouteLogin); 
    });
}, []);

 const handleLogout = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
      withCredentials: true,
    });

    if (res.data.success) {
      navigate(RouteLogin); 
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
};


  return (
 <div className="min-h-screen bg-stone-100 flex flex-col">
  <div className="w-full-screen h-full-screen">
       <div className="w-full bg-indigo-50 py-10 px-6 text-center shadow-sm border-b border-indigo-200">
    <h1 className="text-4xl font-bold text-indigo-700">Welcome to AuthSecure</h1>
    <p className="text-gray-600 mt-2 text-sm sm:text-base">
      A secure authentication system built with MERN stack.
    </p>
  </div>
      </div>

  <div className="flex justify-center items-center flex-1 p-6">
    <div className="w-full max-w-4xl bg-white shadow-lg border border-gray-300 rounded-lg p-4 overflow-x-auto">
      <Table>
        <TableCaption className="mb-2 text-gray-600 font-medium text-base">
          A list of our users
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(users) && users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>

     <button
        onClick={handleLogout}
        className={`fixed mr-2 mt-2 pr-2 pt-2 right-0 hover:text-stone-600 top-0 cursor-pointer group`}
      >
        <LuLogOut size={30} />
        <div className="fixed mr-2 mt-1 pr-2 pt-2 right-0 hidden group-hover:block text-sm">
          Logout
        </div>
      </button>
       <Link
       to={RouteIndex}
        className={`fixed ml-2 mt-2 pl-2 pt-2 left-0 hover:text-stone-600 top-0 cursor-pointer group`}
      >
        <FaHome size={30} />
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

export default HomePage;
