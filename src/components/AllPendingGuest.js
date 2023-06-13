import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";

const AllPendingGuest = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [pendingRequests, setPendingRequests] = useState([]);

  function getToken() {
    return localStorage.getItem("token");
  }

  const homeClickHandler = () => {
    navigate("/homePageGuest");
  };

  function trimDate(date) {
    return date.slice(0, -10);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/reservationRequests/pending/user/${currentUser._id}`,
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
      if (Array.isArray(data.reservationRequest)) {
        const availableDates = data.reservationRequest.map(
          (reservationRequest) => {
            return {
              id: reservationRequest.Id,
              accommodationId: reservationRequest.AccommodationId,
              accommodationName: reservationRequest.AccommodationName,
              startDate: trimDate(reservationRequest.StartDate),
              endDate: trimDate(reservationRequest.EndDate),
              numberOfGuests: reservationRequest.NumberOfGuests,
            };
          }
        );
        setPendingRequests(availableDates);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

 

  const onDeleteClickHandler = (id) => {
    
    console.log(id);
    fetch(`http://localhost:8000/reservationRequests/delete/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return window.alert("Delete failed!");
        }

        fetchProducts();
        window.alert("Delete succesfull.");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during delete req.");
      });
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
                <th>Number of guests</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.accommodationName}</td>
                  <td>{request.numberOfGuests}</td>
                  <td>
                    <button
                      className="button-delete ignore-parent-styles"
                      onClick={() => onDeleteClickHandler(request.id)}
                    >
                      Delete request
                    </button>
                  </td>
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

export default AllPendingGuest;
