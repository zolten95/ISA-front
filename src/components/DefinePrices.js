import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

const DefinePrices = () => {
  const navigate = useNavigate();

  const homeClickHandler = () => {
    navigate("/homePageHost");
  };
  return (
    <button className="button-right_bottom" onClick={homeClickHandler}>
      Home
    </button>
  );
};

export default DefinePrices;
