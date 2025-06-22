import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [userData, setUserData] = useState(false);

  const backendurl = import.meta.env.VITE_API_URL;

  const getAuthState = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendurl}/api/v1/auth/is-auth`, {
        withCredentials: true,
      });
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      } else {
        toast.success("Welcome to our website");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  async function getUserData() {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(
        `${backendurl}/api/v1/user/userdetails`,
        {
          withCredentials: true,
        }
      );
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
    backendurl,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
