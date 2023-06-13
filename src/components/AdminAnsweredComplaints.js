import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";
import axios from "axios";
import HomeButton from "./HomeButton";

const AdminAnsweredComplaints = (props) => {
  const navigate = useNavigate();
  const [answeredComplaints, setAnsweredComplaints] = useState([]);


  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  function getToken() {
    return localStorage.getItem("token");
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/zalba/getOdgovorene",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      );
      const data = await response.data;
      console.log(data);
      if (Array.isArray(data)) {
        const complaints = data.map((complaint) => {
          return {
            id: complaint.zalba.id,
            patient: complaint.zalba.pacijent.email,
            medicalWorker: complaint.zalba.medicinskoOsoblje !==null ?  complaint.zalba.medicinskoOsoblje.email : "",
            medicalCenter: complaint.zalba.medicinskiCentar !==null ? complaint.zalba.medicinskiCentar.imeCentra : "",
            text: complaint.zalba.text,
            answer: complaint.odgovorZalba.text
          };
        });
        // zalba.medicinskiCentar !== null
        // ? zalba.medicinskiCentar.imeCentra
        // : ""
        setAnsweredComplaints(complaints);
      }
    } catch (error) {
      console.log("Error fetching complaints:", error);
    }
  };



 


  return (
    <div>
      <div className="firstpage-container" style={{width: '100%'}}>
       
        <div className="game-history-table-container" style={{width: '100%'}}>
          <table className="complaintsAdmin" style={{width: '1000px'}}>
            <thead>
              <tr>
                <th style={{width: '100px'}}>Patient</th>
                <th style={{width: '30px'}}>Medical worker</th>
                <th style={{width: '30px'}}>Medical center</th>
                <th style={{width: '160px'}}>Text</th>
                <th style={{width: '160px'}}>Answer</th>
              </tr>
            </thead>
            <tbody>
              {answeredComplaints.map((complaint) => (
                <tr
                  key={complaint.id}
                >
                  <td>{complaint.patient}</td>
                  <td>{complaint.medicalWorker !== null ? complaint.medicalWorker : ""}</td>
                  <td>{complaint.medicalCenter !== null ? complaint.medicalCenter : ""}</td>
                  <td>{complaint.text}</td>
                  <td>{complaint.answer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <HomeButton />
    </div>
  );
};

export default AdminAnsweredComplaints;
