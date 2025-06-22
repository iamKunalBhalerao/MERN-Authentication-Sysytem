import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  const [userData, setUserData] = useState(false);

  axios.defaults.withCredentials = true;

  const getAuthState = async () => {
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/auth/is-auth",
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
        {
          withCredentials: true,
        }
      );
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
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/user/userdetails",
        {
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        },
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
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
