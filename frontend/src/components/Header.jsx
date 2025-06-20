import React from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import HomeButtons from "./HomeButtons";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full h-screen  bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex flex-col gap-2 p-4 justify-center items-center">
        <img
          src={assets.header_img}
          alt="header_img"
          className="w-36 h-36 rounded-full mb-6"
        />
        <h1 className="flex gap-2 items-center text-2xl font-semibold text-center">
          Hey Developer{" "}
          <img
            src={assets.hand_wave}
            alt="Hello"
            className="w-10 aspect-square"
          />
        </h1>
        <h2 className="text-3xl font-bold text-center">
          Welcome to Our MERN stack <br /> Authentication System.
        </h2>
        <p className="text-lg text-zinc-600 text-center pb-4">
          In this system you can verify your email and reset your password with
          mail functionality.
        </p>
        <HomeButtons
          onClick={() => {
            navigate("/signin");
          }}
          lable={"Get Started"}
          to={"/signin"}
        />
      </div>
    </>
  );
};

export default Header;
