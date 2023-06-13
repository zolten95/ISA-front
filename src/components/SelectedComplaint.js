import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import HomeButton from "./HomeButton";
import "../css/form.css";
import "../css/board.css";
import "../css/homePage.css";
import "../css/joinGame.css";
import "../css/table.css";

const SelectedComplaint = (props) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [bloocCenters, setBloodCenters] = useState([]);
  const [zalbaText, setZalbaText] = useState("");
  const selectedComplaint = props.selectedComplaint;

  function getToken() {
    return localStorage.getItem("token");
  }

  useEffect(() => {
    console.log(selectedComplaint);
  }, []);

  const sendAnswer = async () => {
    if(zalbaText === ""){
        return window.alert("You must write answer.")
    }

    const id = selectedComplaint.id;
    const odgovorDTO = {
      text: zalbaText,
    };
    fetch(`http://localhost:8080/api/zalba/odgovori/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getToken(),
      },
      body: JSON.stringify(odgovorDTO),
    })
      .then((response) => {
        if (response.status === 400) {
          return window.alert("You cant answer to this complaint!");
        }

        window.alert("Answering succesfull.");
        return navigate("/adminAnsweredComplaints");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during adding.");
      });
  };

  const handleChange = (event) => {
    setZalbaText(event.target.value);
  };

  return (
    <div className="info-container">
        <div className="info-wrapper">
          <label className="label-info">
            Patient: {selectedComplaint.patient}
          </label>
          <label className="label-info">
            Complaint for:{" "}
            {selectedComplaint.medicalWorker !== ""
              ? selectedComplaint.medicalWorker
              : selectedComplaint.medicalCenter}
          </label>
          <label className="lable-info">Text: {selectedComplaint.text}</label>
          {/* medicalWorker: complaint.medicinskoOsoblje !==null ?  complaint.medicinskoOsoblje.email : "",
            medicalCenter: complaint.medicinskiCentar !==null ? complaint.medicinskiCentar.imeCentra : "",
            text: complaint.text, */}
        </div>
      <div className="glavniZalba">

        <div>
          <button className="zalbadugme" onClick={sendAnswer}>
            Send answer
          </button>
        </div>
      </div>

      <div className="zalbaTextDiv">
        <input
          onChange={handleChange}
          type="text"
          className="zalbaText"
          required
        ></input>
      </div>
      <HomeButton />
    </div>
  );
};

export default SelectedComplaint;
