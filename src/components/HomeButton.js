import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"
import "../css/homePage.css"

const HomeButton = () => {
    const navigate = useNavigate()
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const logoutClickHandler = () => {
    
    if(currentUser.tipKorisnika === "RegistrovaniKorisnik") {

      return navigate("/homePageRegistered");
    }
    if(currentUser.tipKorisnika  === "Admin"){
      return navigate("/homePageAdmin")
    }
  }

  return (
    <div>
        <button className="button-right_bottom" onClick={logoutClickHandler}>Home</button>
    </div>
  )

}

export default HomeButton