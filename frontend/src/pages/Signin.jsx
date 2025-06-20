import React from "react";
import AuthHeading from "../components/AuthHeading";
import AuthSubHeading from "../components/AuthSubHeading";
import Input from "../components/Input";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

const Signin = () => {
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
