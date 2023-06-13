import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/homePage.css";

const HomePageGuest = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function getToken() {
    return localStorage.getItem('token');
  }

  const logOutClickHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  const myProfileClickHandler = () => {
    navigate("/myProfile")
  }

  const onAllAccomodationsClick = () =>{
    navigate("/allAccomodationsGuest")
  }

  const onAllPendingClick = () => {
    navigate("/allPendingGuest")
  }

  const onAllAcceptedClick = () => {
    navigate("/allAcceptedGuest")
  }

  return (
    <div className="background" >
      <p className="username">Username: {user.username}</p>
      <button onClick={myProfileClickHandler} className="button-update">My profile</button>
      <div className="menu-wrapper">
        <div className="menu">
          {/* <button className="menu-button" >Create accomodation</button> */}
          <button className="menu-button" onClick={onAllAccomodationsClick} >All accomodations</button>
          {/* <button className="menu-button" onClick={definePricesClickHandler}>Define price and availibiality</button> */}
          <button className="menu-button" onClick={onAllPendingClick}>All pending reservation requests</button>
          <button className="menu-button" onClick={onAllAcceptedClick}>All accepted reservation requests</button>
        </div>
      </div>

      <button className="button-right_bottom" onClick={logOutClickHandler}>
        Log out
      </button>
    </div>
  );
};

export default HomePageGuest;
