import React from "react";

const Button = ({ lable, onClick }) => {
  return (
    <>
      <button
        className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xl cursor-pointer mt-4"
        onClick={onClick}
      >
        {lable}
      </button>
    </>
  );
};

export default Button;
