import React, { useState } from "react";
import AuthHeading from "../components/AuthHeading";
import AuthSubHeading from "../components/AuthSubHeading";
import Input from "../components/Input";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signInHandler = async () => {
    await axios
      .post("http://localhost:3000/api/v1/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        localStorage.setItem("accessToken", response.data.AccessToken);
        navigate("/");
      });
    navigate("/");
  };

  return (
    <>
      <div className="h-screen p-4 bg-zinc-200 flex justify-center items-center">
        <div className="w-96 py-4 px-6 flex flex-col bg-white rounded-xl">
          <AuthHeading heading={"Sign In"} />
          <AuthSubHeading
            subHeading={"Enter Your Information to Get in Your Account."}
          />
          <Input
            lable={"Email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            lable={"Password"}
            type={"password"}
            placeholder={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <BottomWarning buttontxt={"Forgot Password ?"} to={"/signup"} />

          <Button lable={"Continue"} onClick={signInHandler} />
          <BottomWarning
            warning={"Dont have an Account? "}
            buttontxt={"Sign Up"}
            to={"/signup"}
          />
        </div>
      </div>
    </>
  );
};

export default Signin;
