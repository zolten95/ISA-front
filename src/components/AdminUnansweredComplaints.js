import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";
import axios from "axios";
import HomeButton from "./HomeButton";

const AdminUnansweredComplaints = (props) => {
  const navigate = useNavigate();
  const [unansweredComplaints, setUnansweredComplaints] = useState([]);


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
        "http://localhost:8080/api/zalba/getNeodgovorene",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      );
      const data = await response.data;
      if (Array.isArray(data)) {
        const complaints = data.map((complaint) => {
          return {
            id: complaint.id,
            patient: complaint.pacijent.email,
            medicalWorker: complaint.medicinskoOsoblje !==null ?  complaint.medicinskoOsoblje.email : "",
            medicalCenter: complaint.medicinskiCentar !==null ? complaint.medicinskiCentar.imeCentra : "",
            text: complaint.text,
          };
        });
        // zalba.medicinskiCentar !== null
        // ? zalba.medicinskiCentar.imeCentra
        // : ""
        setUnansweredComplaints(complaints);
      }
    } catch (error) {
      console.log("Error fetching complaints:", error);
    }
  };



 

  const complaintClickHandler = (comaplaint) => {
    props.setSelectedComplaint(comaplaint);
    navigate("/selectedComplaint");
  };

  return (
    <div>
      <div className="firstpage-container">
       
        <div className="game-history-table-container">
          <table className="complaintsAdmin">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Medical worker</th>
                <th>Medical center</th>
                <th>Text</th>
              </tr>
            </thead>
            <tbody>
              {unansweredComplaints.map((complaint) => (
                <tr
                  onClick={() => complaintClickHandler(complaint)}
                  key={complaint.id}
                >
                  <td>{complaint.patient}</td>
                  <td>{complaint.medicalWorker !== null ? complaint.medicalWorker : ""}</td>
                  <td>{complaint.medicalCenter !== null ? complaint.medicalCenter : ""}</td>
                  <td>{complaint.text}</td>
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

export default AdminUnansweredComplaints;
