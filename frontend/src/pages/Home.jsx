import React from "react";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <main>
        <Navbar />
        <h1 className="text-4xl font-black text-blue-950 ">
          This is Home Page
        </h1>
      </main>
    </>
  );
};

export default Home;
