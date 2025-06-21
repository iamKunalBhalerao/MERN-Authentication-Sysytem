import React from "react";

const Input = ({ lable, type, placeholder, onChange }) => {
  return (
    <>
      <div className="text-black text-sm font-semibold">{lable}</div>
      <input
        className="w-full p-2 mb-2 border border-zinc-100 rounded-lg bg-zinc-50 outline-0 focus:outline-1 focus:outline-blue-200"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </>
  );
};

export default Input;
