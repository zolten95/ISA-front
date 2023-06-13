import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../css/homePage.css";

const HomePageRegisteredUser = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  function getToken() {
    return localStorage.getItem("token");
  }

  const logOutClickHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  function myProfileClickHandler() {
    navigate("/myProfile");
  }

  function onBloodCentersClick() {
    navigate("/bloodCenters");
  }

  function onHistoryClick() {
    navigate("/historyOfVisits");
  }

  function onReservedClick() {
    navigate("/reservedTerms");
  }

  function onQRclick() {
    navigate("/qrCodes");
  }

  function onPenaltiesClick() {
    navigate("/penalties");
  }

  function onQuestionnaireClick() {
    navigate("/questionaire");
  }

  function onComplaintClick() {
    navigate("/complaint");
  }

  function onMyComplaintClick() {
    navigate("/myComplaints");

  }

  return (
    <div className="background">
      <p className="username">User: {user.email}</p>
      <button onClick={myProfileClickHandler} className="button-update">
        My profile
      </button>
      <div className="menu-wrapper">
        <div className="menu">
          <button className="menu-button" onClick={onBloodCentersClick}>
            All blood centers
          </button>
          <button className="menu-button" onClick={onHistoryClick}>
            My history of visits
          </button>
          <button className="menu-button" onClick={onReservedClick}>
            My reserved terms
          </button>
          <button className="menu-button" onClick={onPenaltiesClick}>
            My penalties
          </button>
          <button className="menu-button" onClick={onQuestionnaireClick}>
            Questionnaire
          </button>
          <button className="menu-button" onClick={onComplaintClick}>
            Write a complaint
          </button>
          <button className="menu-button" onClick={onMyComplaintClick}>
            My complaints
          </button>
        </div>
      </div>

      <button className="button-right_bottom" onClick={logOutClickHandler}>
        Log out
      </button>
    </div>
  );
};

export default HomePageRegisteredUser;
