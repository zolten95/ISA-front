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

const ReservedTerms = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [reservedTerms, setReservedTerms] = useState([]);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const token = localStorage.getItem("token");
      const userId = currentUser.id;
      const headers = {
        Authorization: `${token}`,
      };
      const response = await axios.get(
        `http://localhost:8080/api/termin/getRezervisaniZaKorisnika/${userId}`,
        { headers }
      );
      setReservedTerms(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleCancelTerm = async (event) => {
    const termID = event.target.id;
    const token = localStorage.getItem("token");
    const userID = currentUser.id;

    try {
      const response = await fetch(
        `http://localhost:8080/api/termin/otkaziTermin/${termID}/${userID}`,
        {
          method: "POST",
          headers: { Authorization: token, "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        window.alert("You canceled term succesfully!");
        fetchData();
        return navigate("/homePageRegistered");
      }
      if (response.status === 400) {
        return window.alert(
          "Your term is tomorrow, you cant cancel term right now!"
        );
      }
    } catch (error) {}
  };

  return (
    <div>
      {reservedTerms.length === 0 && (
        <p className="p-center">You dont have any reserved terms!</p>
      )}
      {reservedTerms.length != 0 && (
        <div className="firstpage-container">
          <div className="game-history-table-container">
            <table className="complaintsAdmin">
              <thead>
                <tr>
                  <th>Medical center</th>
                  <th>Date and time</th>
                  <th>Duration</th>
                  <th>Cancel term</th>
                </tr>
              </thead>
              <tbody>
                {reservedTerms.map((term) => (
                  <tr key={term.id}>
                    <td>{term.medicinskiCentar.imeCentra} </td>
                    <td>
                      {moment(term.datumTermina).format("DD/MM/YYYY, h:mm")}
                    </td>
                    <td>{term.trajanje} minutes</td>
                    <td>
                      <button className="cancelButton" id={term.id} onClick={handleCancelTerm}>
                        Cancel term
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <footer>
        <p>
          If u dont come to reserved term u will get penalty. See My penalties
          tab for more information.
        </p>
      </footer>

      <HomeButton></HomeButton>
    </div>
  );
};

export default ReservedTerms;
