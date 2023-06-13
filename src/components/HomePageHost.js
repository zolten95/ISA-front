import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/homePage.css";

const HomePageHost = () => {
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

  const createAccomodationClickHandler = () =>
  {
    navigate("/createAccomodation")
  }

  const allAccomodationsClickHandler = () => {
    navigate("/allAccomodations")
  }

  // const definePricesClickHandler = () => {
  //   navigate("/definePrices")
  // }

  const pendingRequestsClickHandler = () => {
    navigate("/acceptedReservations")
  }

  return (
    <div className="background" >
      <p className="username">Username: {user.username}</p>
      <button onClick={myProfileClickHandler} className="button-update">My profile</button>

      <div className="menu-wrapper">
        <div className="menu">
          <button className="menu-button" onClick={createAccomodationClickHandler}>Create accomodation</button>
          <button className="menu-button" onClick={allAccomodationsClickHandler}>All your accomodations</button>
          {/* <button className="menu-button" onClick={definePricesClickHandler}>Define price and availibiality</button> */}
          <button className="menu-button" onClick={pendingRequestsClickHandler}>Accepted reservations</button>
        </div>
      </div>

      <button className="button-right_bottom" onClick={logOutClickHandler}>
        Log out
      </button>
    </div>
  );
};

export default HomePageHost;
