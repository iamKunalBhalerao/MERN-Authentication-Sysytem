import React, { useRef, useState } from "react";
import AuthSubHeading from "../components/AuthSubHeading";
import AuthHeading from "../components/AuthHeading";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const inputRefs = useRef([]);

  //   Senf Reset Password Otp
  const sendOtpHandler = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/sendresetotp",
        {
          email,
        }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //   Verify Reset Password Otp
  const VerifyOtpHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");
      setOtp(otp);
      setIsOtpSubmited(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/auth/verifyotpandresetpassword",
        {
          email,
          otp,
          newPassword,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/signin");
      } else {
        toast.error(data.message);
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

  return (
    <>
      <div className="h-screen p-4 bg-zinc-200 flex justify-center items-center">
        {/* Send Otp on Email */}
        {!isEmailSent && (
          <form
            onSubmit={sendOtpHandler}
            className="w-96 py-4 px-6 flex flex-col bg-white rounded-xl"
          >
            <AuthHeading heading={"Reset Password"} />
            <AuthSubHeading
              subHeading={"Enter Your Email to Get reset password Otp."}
            />
            <Input
              lable={"Email"}
              type={"email"}
              placeholder={"example@gmail.com"}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button lable={"Continue"} />
          </form>
        )}

        {/* Verify Otp on Email */}
        {!isOtpSubmited && isEmailSent && (
          <form
            onSubmit={VerifyOtpHandler}
            className="w-96 py-4 px-6 flex flex-col bg-white rounded-xl"
          >
            <AuthHeading heading={"Reset Password OTP"} />
            <AuthSubHeading subHeading={"Enter otp sent to your Email."} />
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
            <Button lable={"Verify Otp"} />
          </form>
        )}

        {/* Set New Password */}
        {isOtpSubmited && isEmailSent && (
          <form
            onSubmit={onSubmitNewPassword}
            className="w-96 py-4 px-6 flex flex-col bg-white rounded-xl"
          >
            <AuthHeading heading={"New Password"} />
            <AuthSubHeading subHeading={"Enter the New Password."} />
            <Input
              lable={"New Password"}
              type={"password"}
              placeholder={"Enter New Password"}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            <Button lable={"Reset"} />
          </form>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
