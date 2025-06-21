import React, { useState } from "react";
import Input from "../components/Input";
import AuthHeading from "../components/AuthHeading";
import AuthSubHeading from "../components/AuthSubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signupHandler() {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/signup",
        {
          username,
          email,
          password,
        }
      );
      toast.success(data.message);
      localStorage.setItem("AccessToken", data.AccessToken);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message);
      }
    }
  }

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
              setUsername(e.target.value);
            }}
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
          <Button lable={"Continue"} onClick={signupHandler} />
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
