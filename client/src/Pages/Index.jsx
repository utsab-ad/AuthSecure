import { RouteChatbot } from "@/helpers/RouteNames";
import React from "react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      Index
      <br />
      <div className="flex justify-center items-center">
        <Link
          className="border rounded-lg bg-green-400 px-3 py-1"
          to={RouteChatbot}
        >
          ChatBot
        </Link>
      </div>
    </div>
  );
};

export default Index;
