import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="sticky bg-blue-400 w-full h-16 rounded-md mb-7 flex flex-row justify-between items-center px-6">
      <p className="text-white font-semibold text-xl">
        {location.pathname === "/" ? "Absence" : "Report"}
      </p>
      <div className="w-[170px] flex flex-row justify-between items-center p-2">
        <button
          onClick={() => navigate("/")}
          className={`bg-white px-2 py-1 rounded text-md font-semibold text-blue-300 hover:text-blue-600 `}
        >
          Absence
        </button>
        <button
          onClick={() => navigate("/report")}
          className={`bg-white px-2 py-1 rounded text-md font-semibold text-blue-300 hover:text-blue-600`}
        >
          Report
        </button>
      </div>
    </div>
  );
};

export default Navbar;
