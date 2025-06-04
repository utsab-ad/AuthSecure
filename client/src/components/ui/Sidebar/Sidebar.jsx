import React, { useState, useEffect, useRef } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFacebookF,
  FaGithubSquare,
  FaWhatsapp,
  FaBlog,
  FaJsSquare,
  FaCode,
  FaSignInAlt,
  FaArrowRight,
} from "react-icons/fa";
import {
  HiOutlineMenu,
  HiPencilAlt,
  HiOutlinePhoneMissedCall,
} from "react-icons/hi";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { BsFillPostcardFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import SidebarProfile from "./SidebarProfile";
import Footer from "@/helpingComponents/Footer";
import { RouteBlogs, RouteIndex, RouteLogin } from "@/helper/RouteNames";
import { GrLanguage } from "react-icons/gr";
import { Avatar, AvatarImage } from "../avatar";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexRoute = location.pathname === "/";
  const sidebarRef = useRef(null);
  const touchStartX = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (touchStartX.current === null) return;

    const touchCurrentX = e.touches[0].clientX;
    const diff = touchCurrentX - touchStartX.current;

    if (diff > 50) {
      setIsOpen(true);
      touchStartX.current = null;
    }
  };

  useEffect(() => {
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <div className="flex w-full">
      {/* Slide Button (Mobile) */}
      {!isOpen && (
        <div className="fixed left-0 top-1/2 z-40 transform -translate-y-1/2">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gray-800 text-gray-500 rounded-r-xl h-50 py-4 hover:text-stone-600 transition-all duration-300"
          >
            <FaArrowRight size={10} />
          </button>
        </div>
      )}

      {/* Sidebar Overlay (Mobile) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-50 w-74 md:hidden bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <Link to={RouteIndex} onClick={toggleSidebar}>
            <FaHome size={24} />
          </Link>
          {user?.isLoggedIn && <HiPencilAlt size={24} />}
          {!user?.isLoggedIn && (
            <Link
              to={RouteLogin}
              className="group relative flex items-center justify-center cursor-pointer"
            >
              <FaSignInAlt className="text-purple-700 text-xl" />
              <span className="absolute right-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow transition-opacity duration-300">
                Login
              </span>
            </Link>
          )}
          <button onClick={toggleSidebar}>
            <IoMdClose size={24} />
          </button>
        </div>

        <nav className="mt-4" onClick={toggleSidebar}>
          <ul>
            <li className="hover:bg-gray-700 p-4">
              <SidebarProfile isOpen={isOpen} />
            </li>
           
            <li className="flex flex-wrap items-center bg-gray-800 mr-2 p-1 rounded-r-full border-white">
              <a
                href="mailto:utsabadhikari075@gmail.com"
                className="flex justify-center text-sm gap-2 flex-wrap items-center text-blue-500 truncate hover:underline"
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="p-1 rounded-full"
                  />
                </Avatar>
                utsabadhikari075@gmail.com
              </a>
            </li>

            <li className="p-4 hover:bg-gray-700">
              <div className="flex items-start gap-2 mb-2">
                <GrLanguage size={24} />
                {isOpen && <span className="font-medium">Languages</span>}
              </div>
              {isOpen && (
                <div className="pl-8 space-y-2">
                  <div className="flex justify-between gap-2">
                    <FaJsSquare size={20} />
                    <b>Javascript</b>
                    <span className="text-green-400 text-sm">Main</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <FaCode size={20} title="C" />
                    <b>C</b>
                    <span className="text-stone-400 text-sm">Foundation</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <FaCode size={20} title="C++" />
                    <b>C++</b>
                    <span className="text-stone-400 text-sm">Foundation</span>
                  </div>
                </div>
              )}
            </li>

            <Link to="#">
              <li className="flex items-center p-4 hover:bg-gray-700">
                <BsFillPostcardFill size={24} />
                {isOpen && <span className="ml-4">Projects</span>}
              </li>
            </Link>
            <Link to={RouteBlogs}>
              <li className="flex items-center p-4 hover:bg-gray-700">
                <FaBlog size={24} />
                {isOpen && <span className="ml-4">Blogs</span>}
              </li>
            </Link>
            <li className="flex items-center gap-4 justify-evenly p-4 hover:bg-gray-700 cursor-pointer">
              <FaFacebookF size={24} />
              {isOpen && <FaGithubSquare size={24} />}
              {isOpen && <FaWhatsapp size={24} />}
            </li>
          </ul>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-74 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="p-4 flex items-center justify-between">
          <Link to={RouteIndex}>
            <FaHome size={24} />
          </Link>
          {user?.isLoggedIn && <HiPencilAlt size={24} />}
        </div>

        <nav className="mt-4">
          <ul>
            <Link to={RouteIndex}>
              <li className="hover:bg-gray-700 p-4">
                <SidebarProfile isOpen={true} />
              </li>
            </Link>
            <li className="flex items-center p-4 hover:bg-gray-700">
              <HiOutlinePhoneMissedCall size={24} />
              <a
                href="tel:+9779867508725"
                className="ml-4 text-blue-500 hover:underline"
              >
                9867508725
              </a>
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700">
              <MdMailOutline size={24} />
              <a
                href="mailto:utsabadhikari075@gmail.com"
                className="ml-4 text-blue-500 truncate hover:underline"
              >
                utsabadhikari075@gmail.com
              </a>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <div className="flex items-start gap-2 mb-2">
                <GrLanguage size={24} />
                <span className="font-medium">Languages</span>
              </div>
              <div className="pl-8 space-y-2">
                <div className="flex justify-between gap-2">
                  <FaJsSquare size={20} />
                  <b>Javascript</b>
                  <span className="text-green-400 text-sm">Main</span>
                </div>
                <div className="flex justify-between gap-2">
                  <FaCode size={20} title="C" />
                  <b>C</b>
                  <span className="text-stone-400 text-sm">Foundation</span>
                </div>
                <div className="flex justify-between gap-2">
                  <FaCode size={20} title="C++" />
                  <b>C++</b>
                  <span className="text-stone-400 text-sm">Foundation</span>
                </div>
              </div>
            </li>
            <Link to="#">
              <li className="flex items-center p-4 hover:bg-gray-700">
                <BsFillPostcardFill size={24} />
                <span className="ml-4">Projects</span>
              </li>
            </Link>
            <Link to={RouteBlogs}>
              <li className="flex items-center p-4 hover:bg-gray-700">
                <FaBlog size={24} />
                <span className="ml-4">Blogs</span>
              </li>
            </Link>
            <li className="flex items-center justify-evenly p-4 hover:bg-gray-700 cursor-pointer ">
              <FaFacebookF size={24} />
              <FaGithubSquare size={24} />
              <FaWhatsapp size={24} />
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div
        onClick={() => setIsOpen(false)}
        className="flex min-h-[100vh] flex-col md:ml-74 flex-1 bg-gradient-to-br from-gray-50 via-blue-100 to-white dark:from-gray-900 dark:via-slate-800 dark:to-gray-950 text-gray-800 dark:text-white"
      >
        {!isIndexRoute && (
          <button
            onClick={() => navigate(-1)}
            className="fixed top-2 left-20 md:left-72 px-4 py-2 hover:text-stone-600"
          >
            <IoMdArrowRoundBack />
          </button>
        )}
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
