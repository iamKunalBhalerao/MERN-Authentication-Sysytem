import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Account from "./pages/Account";
import VerifyMail from "./pages/VerifyMail";
import ResetPassword from "./pages/ResetPassword";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/account" element={<Account />} />
        <Route path="/verifymail" element={<VerifyMail />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
