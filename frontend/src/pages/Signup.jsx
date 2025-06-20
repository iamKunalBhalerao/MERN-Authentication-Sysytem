import React from "react";
import Input from "../components/Input";
import AuthHeading from "../components/AuthHeading";
import AuthSubHeading from "../components/AuthSubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signup = () => {
  return (
    <>
      <div className="h-screen p-4 bg-zinc-200 flex justify-center items-center">
        <div className="w-96 py-4 px-6 flex flex-col bg-white rounded-xl">
          <AuthHeading heading={"Sign Up"} />
          <AuthSubHeading
            subHeading={"Enter Your Information to create an Account."}
          />
          <Input
            lable={"Username"}
            type={"text"}
            placeholder={"Jhon"}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <Input
            lable={"Email"}
            type={"email"}
            placeholder={"example@gmail.com"}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <Input
            lable={"Password"}
            type={"password"}
            placeholder={"password"}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
          <Button
            lable={"Continue"}
            onClick={() => {
              console.log("You are Signed Up Successfully");
            }}
            to={"/"}
          />
          <BottomWarning
            warning={"Alredy Have an Account, "}
            buttontxt={"Sign In"}
            to={"/signin"}
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
