
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaAddressBook,
  FaFacebookF,
  FaGithubSquare,
  FaCode,
} from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import { IoMdArrowRoundBack, IoMdClose } from "react-icons/io";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { HiPencilAlt } from "react-icons/hi";
import { FaBlog } from "react-icons/fa";
import axios from "axios";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { FaJsSquare } from "react-icons/fa";
import { SiFramework } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa6";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { MdMailOutline } from "react-icons/md";
import Footer from "@/helper/Components/Footer";
import { RouteBlogs, RouteIndex } from "@/helper/RouteNames";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const user = useSelector((state) => state.user);

  const [isOpen, setIsOPen] = useState(false);
     const navigate = useNavigate();
      const location = useLocation();

      const isIndexRoute = location.pathname === "/";

  return (
    <div className="flex w-full">
          <div
            className={`fixed top-0 left-0 h-full  w-15 md:w-74 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 transition-width duration-300 text-white 
        ${isOpen ? "w-74 " : "w-15"}
        `}
          >
            <div className="flex justify-between items-center p-4">
              <h2
                className={`text-xl font-bold  md:block ${
                  isOpen ? "block" : "hidden"
                } `}
              >
                Portfolio
              </h2>
                {user && user.isLoggedIn ? <>
                 <Link
                className={`font-medium ml-4 md:block ${
                  isOpen ? "block" : "hidden"
                }`}
              >
                <HiPencilAlt size={24} />
              </Link>
                </> : <></>}

              <button
                className="block md:hidden"
                onClick={() => setIsOPen(!isOpen)}
              >
                {isOpen ? <IoMdClose size={24} /> : <HiOutlineMenu size={24} />}
              </button>
            </div>
            <nav className="mt-4">
              <ul>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer">
                  <div
                    className={` flex flex-col md:mx-auto md: items-center md: gap-4 ${
                      isOpen ? "mx-auto items-center gap-4" : ""
                    }`}
                  >
                    <Link to={RouteIndex}>
                      <Avatar onClick={() => setIsOPen(!isOpen)}>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          className={`md:border-2 md:border-black  md:rounded-full ${
                            isOpen ? "border-2 border-black rounded-full" : ""
                          }`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Link>
                    <span
                      className={`ml-4 md:block md:flex md:flex-col md:items-center ${
                        isOpen ? "block flex flex-col items-center" : "hidden"
                      }`}
                    >
                      <h3 className="text-2xl font-bold">Utsab Adhikari</h3>
                      <Badge variant="outline" className={`bg-violet-600`}>
                        Fullstack Developer
                      </Badge>
                    </span>
                  </div>
                </li>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer w-full">
                  <HiOutlinePhoneMissedCall size={24} />

                  {/* Text and Add Button Wrapper */}
                  <div
                    className={`flex items-center justify-between w-full ml-4 pr-4 
                ${isOpen ? "block" : "hidden"} 
                md:flex`}
                  >
                    <a
                      href={`tel:+9779867508725`}
                      className="text-blue-600 hover:underline"
                    >
                      9867508725
                    </a>
                  </div>
                </li>
                <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer w-full">
                  <MdMailOutline size={24} />

                  {/* Text and Add Button Wrapper */}
                  <div
                    className={`flex truncate items-center justify-between w-full ml-4 pr-4 
                ${isOpen ? "block" : "hidden"} 
                md:flex`}
                  >
                    <a
                      href={`mailto:utsabadhikari075@gmail.com`}
                      className="text-blue-600 hover:underline "
                    >
                      utsabadhikari075@gmail.com
                    </a>
                  </div>
                </li>

                <a
                href="#lang"
                  className="flex md:p-3 items-center hover:bg-gray-700 cursor-pointer"
                >
                  <GrLanguage
                    size={24}
                    className={` md:hidden ${isOpen ? "hidden" : "block m-4"}`}
                  />
                  <div className="flex ">
                    <span
                      className={`font-medium md:block ${
                        isOpen ? "block p-3" : "hidden"
                      }`}
                    >
                      <div className="flex gap-4">
                        <GrLanguage size={24} />
                        Languages:
                      </div>
                      <div className="ml-4 pl-6">
                        <p className="flex justify-between gap-2">
                          <FaJsSquare size={20} />
                          <span>
                            <b>Javascript</b>
                          </span>
                          <b className="text-sm flex items-center text-green-400">
                            Main
                          </b>
                        </p>
                        <p className="flex bitems-center justify-between gap-2">
                          <FaCode title="C Language" size={20} />
                          <span>
                            <b>C</b>
                          </span>
                          <i className="text-sm flex items-center text-stone-400">
                            Foundation
                          </i>
                        </p>
                        <p className="flex bitems-center justify-between gap-2">
                          <FaCode title="C Language" size={20} />
                          <span>
                            <b>C++</b>
                          </span>
                          <i className="text-sm flex items-center text-stone-400">
                            Foundation
                          </i>
                        </p>
                      </div>
                    </span>
                  </div>
                </a>
                <Link>
                  <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer w-full">
                    <BsFillPostcardFill size={24} />

                    {/* Text and Add Button Wrapper */}
                    <div
                      className={`flex items-center justify-between w-full ml-4 pr-4 
                ${isOpen ? "block" : "hidden"} 
                md:flex`}
                    >
                      Projects
                    </div>
                  </li>
                </Link>
                <Link to={RouteBlogs}>
                  <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer w-full">
                    <FaBlog size={24} />
                    <div
                      className={`flex items-center justify-between w-full ml-4 pr-4 
                ${isOpen ? "block" : "hidden"} 
                md:flex`}
                    >
                      Blogs
                    </div>
                  </li>
                </Link>
                <li
                  className="flex w-full p-4 items-center hover:bg-gray-700 cursor-pointer"
                >
                  <FaFacebookF
                    size={24}
                    className={` md:hidden ${isOpen ? "hidden" : "block"}`}
                  />
                  <div className="flex  w-full">
                    <span
                      className={`font-medium w-full md:block ${
                        isOpen ? "block p-3" : "hidden"
                      }`}
                    >
                      <div className=" flex w-full justify-evenly gap-4 items-center">
                        <FaFacebookF size={24} />
                        <FaGithubSquare size={24} />
                        <FaWhatsapp size={24} />
                      </div>
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
      <div className="flex ml-15 md:ml-74 flex-1 flex-col bg-gradient-to-br from-gray-50 via-blue-100 to-white dark:from-gray-900 dark:via-slate-800 dark:to-gray-950 text-gray-800 dark:text-white ">
        <button
                 onClick={() => navigate(-1)}
                 className={`fixed md:left-73 left-15
                   m-2 px-4 py-2 hover:text-stone-600 top-0 ${isOpen || isIndexRoute ? "hidden" : "block"}`}
               >
                 <IoMdArrowRoundBack/>
               </button>
        <Outlet />
      <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
