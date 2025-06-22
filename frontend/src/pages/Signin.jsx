import React, { useContext, useState } from "react";
import AuthHeading from "../components/AuthHeading";
import AuthSubHeading from "../components/AuthSubHeading";
import Input from "../components/Input";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setIsLoggedIn, getUserData } = useContext(AppContext);

  async function signInHandler() {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      if (localStorage.getItem("AccessToken")) {
        localStorage.removeItem("AccessToken");
        localStorage.setItem("AccessToken", data.AccessToken);
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      } else {
        localStorage.setItem("AccessToken", data.AccessToken);
      }
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
          <BottomWarning
            buttontxt={"Forgot Password ?"}
            to={"/resetpassword"}
          />

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
