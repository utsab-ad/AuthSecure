import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackNavigation = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`fixed ml-2 mt-2 pl-2 pt-2 left-0 hover:text-stone-600 top-0 cursor-pointer`}
    >
      <IoMdArrowRoundBack />
    </button>
  );
};

export default BackNavigation;
