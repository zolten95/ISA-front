import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("token");

const SelectedCenter = (props) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const [terms, setTerms] = useState([]);
  const medId = props.selectedBloodCenter.id;
  function handleShowAllClick(event) {
    props.setSelectedBloodCenter(null);
    navigate("/bloodCenters")
  }
  useEffect(() => {
   
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };
      const response = await axios.get(
        `http://localhost:8080/api/termin/getTerminiZaCentar/${props.selectedBloodCenter.id}`,
        { headers }
      );
      setTerms(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleReserveTerm = async (event) => {
    const termID = event.target.id;
   
    try {
      const response = await fetch(
        `http://localhost:8080/api/termin/rezervisiTermin/${termID}/${currentUser.id}`,
        {
          method: "POST",
          headers: { Authorization: token, "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        window.alert("You reserved term succesfully!");
        return navigate("/reservedTerms");
      }
      if (response.status === 400) {
        return window.alert("You cant reserve term!");
      }
    } catch (error) {}
  };
  return (
    <div>
      <button className="button-right_bottom" onClick={handleShowAllClick}>Show all</button>
      <div className="firstpage-container">
          <div className="game-history-table-container">
            <table className="complaintsAdmin">
                <thead>
                <tr>
                    <th>Date and time</th>
                    <th>Duration</th>
                    <th>Reserve term</th>
                </tr>
                </thead>
                <tbody>
                {terms.map((term) => (
                    <tr key={term.id}>
                    <td>{moment(term.datumTermina).format("DD/MM/YYYY, HH:mm")}</td>
                    <td>{term.trajanje}</td>
                    <td>
                        <button className="reserveButton" id={term.id} onClick={handleReserveTerm}>
                        Reserve term
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

        </div>
      </div>
      
    </div>
  );
};

export default SelectedCenter;
