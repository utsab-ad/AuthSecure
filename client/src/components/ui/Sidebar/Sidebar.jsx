import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaFacebookF,
  FaGithubSquare,
  FaWhatsapp,
  FaBlog,
  FaJsSquare,
  FaCode,
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
import { RouteBlogs, RouteIndex } from "@/helper/RouteNames";
import { GrLanguage } from "react-icons/gr";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isIndexRoute = location.pathname === "/";

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex w-full">

        {/* For Mobile */}
      <div
        className={`fixed md:hidden top-0 left-0 h-full z-50 transition-width duration-200 ease-in-out text-white ${
          isOpen ? "w-64" : "w-15"
        } bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900`}
      >
        <div className="flex items-center justify-between p-4">
          <Link to={RouteIndex} onClick={toggleSidebar} className={`${isOpen ? "block" : "hidden"}`}>
            <FaHome size={24} />
          </Link>
          {user?.isLoggedIn && <HiPencilAlt size={24} />}
          <button onClick={toggleSidebar}>
            {isOpen ? <IoMdClose size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>

        <nav className="mt-4" onClick={toggleSidebar}>
          <ul>
            <li className="hover:bg-gray-700 p-4">
              <SidebarProfile isOpen={isOpen} />
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700">
              <HiOutlinePhoneMissedCall size={24} />
              {isOpen && (
                <a
                  href="tel:+9779867508725"
                  className="ml-4 text-blue-500 hover:underline"
                >
                  9867508725
                </a>
              )}
            </li>
            <li className="flex items-center p-4 hover:bg-gray-700">
              <MdMailOutline size={24} />
              {isOpen && (
                <a
                  href="mailto:utsabadhikari075@gmail.com"
                  className="ml-4 text-blue-500 truncate hover:underline"
                >
                  utsabadhikari075@gmail.com
                </a>
              )}
            </li>
              <li className="flex items-center p-4 hover:bg-gray-700">
                <div className="flex gap-4 items-center mb-2 flex-wrap">
                    <div className="flex items-center justify-start gap-2">
                      <GrLanguage size={24} />
                      {isOpen && <span className="font-medium">Languages</span>}
                    </div>
                    {isOpen && (
                      <div className="pl-8 space-y-2">
                        <div className="flex justify-between gap-2">
                          <FaJsSquare size={20} />
                          <span><b>Javascript</b></span>
                          <span className="text-green-400 text-sm">Main</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <FaCode size={20} title="C" />
                          <span><b>C</b></span>
                          <span className="text-stone-400 text-sm">Foundation</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <FaCode size={20} title="C++" />
                          <span><b>C++</b></span>
                          <span className="text-stone-400 text-sm">Foundation</span>
                        </div>
                      </div>
                    )}
                    </div>
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
             <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer ">
              <div className={`${isOpen ? "flex gap-4 mx-auto" : ""}`}>
                <FaFacebookF size={24} />
                {isOpen && <FaGithubSquare size={24} />}
                {isOpen && <FaWhatsapp size={24} />}
              </div>
            </li>
          </ul>
        </nav>
      </div>

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
              <li className="flex items-center p-4 hover:bg-gray-700">
                <div className="flex gap-4 items-center mb-2 flex-wrap">
                    <div className="flex items-center justify-start gap-2">
                      <GrLanguage size={24} />
                    <span className="font-medium">Languages</span>
                    </div>
        
                      <div className="pl-8 space-y-2">
                        <div className="flex justify-between gap-2">
                          <FaJsSquare size={20} />
                          <span><b>Javascript</b></span>
                          <span className="text-green-400 text-sm">Main</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <FaCode size={20} title="C" />
                          <span><b>C</b></span>
                          <span className="text-stone-400 text-sm">Foundation</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <FaCode size={20} title="C++" />
                          <span><b>C++</b></span>
                          <span className="text-stone-400 text-sm">Foundation</span>
                        </div>
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

      <div
        onClick={() => setIsOpen(false)}
        className="ml-15 flex min-h-[100vh] flex-col md:ml-74 flex-1 bg-gradient-to-br from-gray-50 via-blue-100 to-white dark:from-gray-900 dark:via-slate-800 dark:to-gray-950 text-gray-800 dark:text-white"
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
