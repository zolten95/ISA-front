import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

const PendingRequests = () => {

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  function getToken() {
    return localStorage.getItem("token");
  }

  const homeClickHandler = () => {
    navigate("/homePageHost");
  };

  function trimDate(date) {
    return date.slice(0, -10);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const getGuest = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/getUserByID/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      const name = data.name;
      return name;
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/reservations/getAllAcceptedForUser/${currentUser._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      );
      const data = await response.json();

      console.log(data)
      if (Array.isArray(data.reservations)) {
        const newAccommodations = [];
  
        for (const reservation of data.reservations) {
          const guest = await getGuest(reservation.userId);
  
          newAccommodations.push({
            user: guest,
            accomodation: reservation.accomodation,
            startDate: trimDate(reservation.StartDate),
            endDate: trimDate(reservation.EndDate),
          });
        }
  
        setAcceptedRequests(newAccommodations);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };




  
  return (
    <div>
    <div className="game-history-container">
      <div className="game-history-table-container">
        <table className="game-history-table ">
          <thead>
            <tr>
              <th>Start date</th>
              <th>End date</th>
              <th>Accomodation</th>
              <th>Guest</th>
            </tr>
          </thead>
          <tbody>
            {acceptedRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.accomodation}</td>
                <td>{request.guest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <button className="button-right_bottom" onClick={homeClickHandler}>
      Home
    </button>
    </div>
  );
};

export default PendingRequests;
