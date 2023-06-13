import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"
import "../css/homePage.css"

const BackButton = () => {
    const navigate = useNavigate()


  const logoutClickHandler = () => {
    navigate('/bloodCenters')
  }

  return (
    <div>
        <button className="button-right_bottom" onClick={logoutClickHandler}>All centers</button>
    </div>
  )

}

export default BackButton