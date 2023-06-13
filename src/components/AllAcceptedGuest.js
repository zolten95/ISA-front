import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";

const AllAcceptedGuest = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [acceptedRequests, setAcceptedRequests] = useState([]);

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
      if (Array.isArray(data.ReservationDTO)) {
        const availableDates = data.ReservationDTO.map(
          (reservationRequest) => {
            return {
              id: reservationRequest.Id,
              accommodationName: reservationRequest.AccommodationName,
              startDate: trimDate(reservationRequest.StartDate),
              endDate: trimDate(reservationRequest.EndDate),
            };
          }
        );
        setAcceptedRequests(availableDates);
        console.log(acceptedRequests)
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

 

  const onDeleteClickHandler = (id) => {
    
    console.log(id);
    fetch(`http://localhost:8000/reservations/cancel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return window.alert("You cannot cancel this reservation!");
        }

        fetchProducts();
        window.alert("Cancel succesfull.");
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
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {acceptedRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.startDate}</td>
                  <td>{request.endDate}</td>
                  <td>{request.accommodationName}</td>
                  <td>
                    <button
                      className="button-delete ignore-parent-styles"
                      onClick={() => onDeleteClickHandler(request.id)}
                    >
                      Cancel request
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

export default AllAcceptedGuest;
