import React, { useContext, useEffect, useRef } from "react";
import AuthHeading from "../components/AuthHeading";
import AuthSubHeading from "../components/AuthSubHeading";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const VerifyMail = () => {
  const navigate = useNavigate();

  const { getUserData, isLoggedIn, userData } = useContext(AppContext);

  const inputRefs = useRef([]);

  const VerifyOtpHanler = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/verifyotp",
        {
          otp,
        },
        {
          headers: {
            Authorization: localStorage.getItem("AccessToken"),
          },
        },
        {
          withCredentials: true,
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const inputHandle = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  useEffect(() => {
    isLoggedIn && userData && userData.IsemailVerified && navigate("/");
  }, [isLoggedIn, userData]);

  return (
    <>
      <div className="h-screen p-4 bg-zinc-200 flex justify-center items-center">
        <div className="w-96 py-4 px-6 flex flex-col bg-white rounded-xl">
          <AuthHeading heading={"Verify Email"} />
          <AuthSubHeading
            subHeading={"Enter the 6 digit code to Verify your Email."}
          />
          <div className="flex justify-between mb-2" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((value, index) => (
                <input
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => inputHandle(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  type="text"
                  name="otp"
                  maxLength={1}
                  key={index}
                  className="w-12 h-12 text-black font-medium bg-gray-200 rounded-lg text-xl text-center outline-0 focus:outline-1 focus:outline-blue-300"
                  required
                />
              ))}
          </div>
          <Button lable={"Verify Otp"} onClick={VerifyOtpHanler} />
          <BottomWarning warning={"Not get Otp? "} buttontxt={"Resend Otp"} />
        </div>
      </div>
    </>
  );
};

export default VerifyMail;
