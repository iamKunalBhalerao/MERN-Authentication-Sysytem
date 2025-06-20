import React from "react";
import Button from "./Button";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center py-3 px-6 shadow">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />
        <div className="flex items-center justify-center gap-2">
          <Button lable={"Sign Up"} to={"/signup"} />
          <Button lable={"Sign In"} to={"/signin"} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
