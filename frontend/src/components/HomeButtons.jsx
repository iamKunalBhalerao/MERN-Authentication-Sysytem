import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const HomeButtons = ({ lable, to, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="py-2 px-4 text-lg text-zinc-800 rounded-full transition delay-150 duration-300 ease-in-out border border-zinc-700 cursor-pointer hover:bg-zinc-200 hover:text-black"
      >
        <Link to={to} className="flex items-center gap-2">
          {lable} <img src={assets.arrow_icon} alt="" className="w-4" />
        </Link>
      </button>
    </>
  );
};

export default HomeButtons;
