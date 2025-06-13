import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { RiChatVoiceAiFill } from "react-icons/ri";
import { RouteChatbot } from "@/helpers/RouteNames.js";
import Footer from "@/components/Footer.jsx";

const Layout = () => {
  const navigate = useNavigate();
  const isIndexRoute = location.pathname === "/";
  const isChatbotRoute = location.pathname === "/project/one/chatbot";
  return (
    //topbar
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-blue-200 text-gray-800 font-sans transition-colors duration-500">
          <SidebarTrigger className="md:hidden fixed top-0" />
          <Outlet />
          {!isIndexRoute && (
            <button
              onClick={() => navigate(-1)}
              className={`fixed top-8 md:hidden left-1  hover:text-stone-600 cursor-pointer`}
            >
              <IoMdArrowRoundBack />
            </button>
          )}
          {!isIndexRoute && (
            <button
              onClick={() => navigate(-1)}
              className={`fixed top-2 hidden md:block  hover:text-stone-600 cursor-pointer`}
            >
              <IoMdArrowRoundBack />
            </button>
          )}
          {!isChatbotRoute && (
            <Link className="fixed bottom-10 right-2" to={RouteChatbot}>
              <Button
                variant="outline"
                className="dark:bg-green-400 bg-green-400 hover:bg-green-300 dark:hover:bg-green-300"
                size="sm"
              >
                <RiChatVoiceAiFill /> Chat with Agent
              </Button>
            </Link>
          )}
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};

export default Layout;
