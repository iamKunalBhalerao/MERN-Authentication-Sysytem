import React, { useContext } from "react";
import { assets } from "../assets/assets";
import HomeButtons from "./HomeButtons";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const { setIsLoggedIn, userData, setUserData, backendurl } =
    useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendurl}/auth/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem("AccessToken");
      data.success && setIsLoggedIn(false);
      data.success && setUserData(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendurl}/auth/sendverificationotp`,
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
        navigate("/verifymail");
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <nav className="w-full bg-transparent flex fixed justify-between items-center py-3 px-6">
        <img src={assets.logo} alt="logo" className="w-28 sm:w-32" />
        <div className="flex items-center justify-center gap-2">
          {userData ? (
            <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-500 text-white group">
              {userData.userName[0].toUpperCase()}
              <div className="absolute hidden group-hover:block top-2 right-2 z-10 text-black rounded-lg pt-10">
                <ul className="list-none m-0 p-2 bg-gray-100 text-sm rounded-lg">
                  {!userData.IsemailVerified && (
                    <li
                      className="py-1 px-2 transition delay-100 duration-300 ease-in-out hover:bg-gray-200 cursor-pointer rounded-md"
                      onClick={sendVerificationOtp}
                    >
                      Verify Email
                    </li>
                  )}
                  <li
                    className="py-1 px-2 transition delay-100 duration-300 ease-in-out hover:bg-gray-200 cursor-pointer rounded-md "
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <HomeButtons
              onClick={() => {
                navigate("/signin");
              }}
              lable={"Sign In"}
              to={"/signin"}
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
