import React from "react";
import { Link } from "react-router-dom";

const BottomWarning = ({ warning, to, buttontxt }) => {
  return (
    <>
      <p className="text-md pt-2 text-zinc-400">
        {warning}
        <Link to={to} className="text-blue-600 underline">
          {buttontxt}
        </Link>
      </p>
    </>
  );
};

export default BottomWarning;
