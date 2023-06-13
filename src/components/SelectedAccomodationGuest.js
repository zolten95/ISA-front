import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";
import "../css/board.css";

const SelectedAccomodationGuest = (props) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const selectedAccomodation = props.guestSelectedAccomodation;
  const [reservationRequest, setReservationRequest] = useState({
    UserId: currentUser._id,
    AccommodationId: selectedAccomodation.id,
    StartDate: null,
    EndDate: null,
    NumberOfGuests: 0,
    Status: "Pending"
    // deleted: false
  });

  const handleChange = (event) => {
    console.log(reservationRequest);
    let temp = "Z";

    if (event.target.name === "startDate") {
      const inputDateTime = event.target.value;
      const date = new Date(inputDateTime);

      const outputDateTime = date.toISOString();
      const slicedDateTime = outputDateTime.slice(0, -5);
      //console.log(slicedDateTime)
      const e = slicedDateTime + temp;
      console.log(e);
      setReservationRequest({
        ...reservationRequest,
        StartDate: e,
      });
      return;
    }

    if (event.target.name === "endDate") {
      console.log("dosao");
      const inputDateTime = event.target.value;
      const date = new Date(inputDateTime);

      const outputDateTime = date.toISOString();
      const slicedDateTime = outputDateTime.slice(0, -5);
      //console.log(slicedDateTime)
      const g = slicedDateTime + temp;
      //console.log(e);
      setReservationRequest({
        ...reservationRequest,
        EndDate: g,
      });
      return;
    }

    setReservationRequest({
      ...reservationRequest,
      [event.target.name]: event.target.value,
    });
  };
  function getToken() {
    return localStorage.getItem("token");
  }

  const returnClickHandler = () => {
    props.setGuestSelectedAccomodation({});
    navigate("/allAccomodationsGuest");
  };

  const onReserveClickHandler = async (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/reservationRequests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(reservationRequest),
    })
      .then((response) => {
        if (response.status !== 200) {
          return window.alert("This accommodation cant make reserve for this requirements!");
        }

        window.alert("Adding reservations succesfull.");
        return navigate("/allAccomodationsGuest");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during adding reservation.");
      });
  };

  return (
    <div>
      <div className="info-container">
        <div className="info-wrapper">
          <label className="label-info">
            Accomodation name: {selectedAccomodation.name}
          </label>
          <label className="label-info">
            Address:{" "}
            {selectedAccomodation.address + ", " + selectedAccomodation.city}
          </label>
          <label className="label-info">
            Benefits: {selectedAccomodation.benefits}
          </label>

          <div className="divLabel">
            <label className="boldLabel">Create available date</label>
          </div>

          <form onSubmit={onReserveClickHandler}>
            <div className="input-group">
              <label htmlFor="startDate">Start date</label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="input-group">
              <label htmlFor="endDate">End date</label>
              <input type="date" onChange={handleChange} name="endDate" required></input>
            </div>
            <div className="input-group">
              <label htmlFor="NumberOfGuests">Guests</label>
              <input
                type="number"
                name="NumberOfGuests"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div class="button-group">
              <button className="item" type="submit">
                Send reservation request
              </button>
            </div>
          </form>
        </div>
      </div>
      <button className="button-right_bottom" onClick={returnClickHandler}>
        Return
      </button>
    </div>
  );
};

export default SelectedAccomodationGuest;
