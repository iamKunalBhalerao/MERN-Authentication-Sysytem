import React from "react";
import { Link } from "react-router-dom";

const Button = ({ lable, onClick, to }) => {
  return (
    <>
      <Link to={to}>
        <button
          className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xl cursor-pointer"
          onClick={onClick}
        >
          {lable}
        </button>
      </Link>
    </>
  );
};

export default Button;
