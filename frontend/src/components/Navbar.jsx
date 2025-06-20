import React from "react";
import { assets } from "../assets/assets";
import HomeButtons from "./HomeButtons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="w-full bg-transparent flex fixed justify-between items-center py-3 px-6">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />
        <div className="flex items-center justify-center gap-2">
          <HomeButtons
            onClick={() => {
              navigate("/signin");
            }}
            lable={"Sign In"}
            to={"/signin"}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
