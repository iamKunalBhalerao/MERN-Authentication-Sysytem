import React from "react";
import { Link } from "react-router-dom";

const Button = ({ lable, onClick, to }) => {
  return (
    <>
      <Link to={to}>
        <button
          className="w-full p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xl mt-2 cursor-pointer"
          onClick={onClick}
        >
          {lable}
        </button>
      </Link>
    </>
  );
};

export default Button;
