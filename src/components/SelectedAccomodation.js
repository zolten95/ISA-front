import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";
import "../css/board.css";

const SelectedAccomodation = (props) => {
  const selectedAccomodation = props.selectedAccomodation;
  const [availableDates, setAvailableDates] = useState([]);
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [availableDate, setAvailableDate] = useState({
    accommodation: selectedAccomodation.id,
    startDate: null,
    endDate: null,
    price: 0,
    pricingType: 0,
    id: "",
  });

  function getToken() {
    return localStorage.getItem("token");
  }

  const returnClickHandler = () => {
    props.setSelectedAccomodation({});
    navigate("/allAccomodations");
  };

  function trimDate(date) {
    return date.slice(0, -10);
  }

  useEffect(() => {
    fetchProducts();
    fetchReservations();
    fetchAccepted()
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

  const getNumberOfCancels = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/reservations/canceled/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      const num = data.num;
      return num;
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/reservationRequests/pending/accomodation/${selectedAccomodation.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      );
      const data = await response.json();
      console.log(data);

      if (Array.isArray(data.reservationRequest)) {
        const newReservations = data.reservationRequest.map((reservation) => {
          return {
            id: reservation.Id,
            userId: reservation.UserId,
            numberOfCancels: reservation.UserId,
            accomodationName: selectedAccomodation.name,
            startDate: trimDate(reservation.StartDate),
            endDate: trimDate(reservation.EndDate),
            numberOfGuests: reservation.NumberOfGuests,
            deleted: reservation.deleted,
          };
        });
        setReservations(newReservations);

        let tempReservations = [];
        for (const reservation of newReservations) {
          const name = await getGuest(reservation.userId);

          tempReservations.push({
            id: reservation.id,
            userId: reservation.userId,
            user: name,
            numberOfCancels: reservation.UserId,
            accomodationName: selectedAccomodation.name,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            numberOfGuests: reservation.NumberOfGuests,
            deleted: reservation.deleted,
          });
        }

        let tempReservations2 = [];
        for (const reservation of tempReservations) {
          const cancels = await getNumberOfCancels(reservation.userId);

          tempReservations2.push({
            id: reservation.id,
            user: reservation.user,
            cancels: cancels,
            numberOfCancels: cancels,
            accomodationName: selectedAccomodation.name,
            startDate: reservation.startDate,
            endDate: reservation.endDate,
            numberOfGuests: reservation.NumberOfGuests,
            deleted: reservation.deleted,
          });
        }

        setReservations(tempReservations2);

        console.log(tempReservations2);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/availableDate", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: getToken(),
        },
      });
      const data = await response.json();

      if (Array.isArray(data.availableDates)) {
        const availableDates = data.availableDates.map((availableDate) => {
          return {
            accommodation: availableDate.accommodation,
            startDate: trimDate(availableDate.startDate),
            endDate: trimDate(availableDate.endDate),
            price: availableDate.price,
            pricingType: availableDate.pricingType,
            id: availableDate.id,
          };
        });
        setAvailableDates(availableDates);
        const filteredDates = availableDates.filter((availableDate) => {
          return availableDate.accommodation === selectedAccomodation.id;
        });
        setAvailableDates(filteredDates);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const handleChange = (event) => {
    let temp = "Z";
    if (event.target.name === "pricingType") {
      if (event.target.value == "0") {
        setAvailableDate({
          ...availableDate,
          [event.target.name]: 0,
        });
      } else {
        setAvailableDate({
          ...availableDate,
          [event.target.name]: 1,
        });
      }
      return;
    }

    if (event.target.name === "startDate") {
      const inputDateTime = event.target.value;
      const date = new Date(inputDateTime);

      const outputDateTime = date.toISOString();
      const slicedDateTime = outputDateTime.slice(0, -5);
      //console.log(slicedDateTime)
      const e = slicedDateTime + temp;

      setAvailableDate({
        ...availableDate,
        startDate: e,
      });
      return;
    }

    if (event.target.name === "endDate") {
      const inputDateTime = event.target.value;
      const date = new Date(inputDateTime);

      const outputDateTime = date.toISOString();
      const slicedDateTime = outputDateTime.slice(0, -5);
      //console.log(slicedDateTime)
      const g = slicedDateTime + temp;
      //console.log(e);
      setAvailableDate({
        ...availableDate,
        endDate: g,
      });
      return;
    }

    setAvailableDate({
      ...availableDate,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmitClickHandler = async (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/availableDate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(availableDate),
    })
      .then((response) => {
        if (response.status !== 200) {
          return window.alert("Adding failed!");
        }

        setAvailableDate({
          accommodation: selectedAccomodation.id,
          startDate: null,
          endDate: null,
          price: 0,
          pricingType: 0,
        });
        fetchProducts();
        window.alert("Adding succesfull.");
        //return fetchAvailableDates
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during adding accomodation.");
      });
  };

  const onAcceptClickHandler = async (id) => {

    fetch(`http://localhost:8000/reservationRequests/accept/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return window.alert("Accepting failed!");
        }

        fetchReservations();
        fetchAccepted()
        window.alert("Accepting succesfull.");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during accepting req.");
      });
  };

  const onDeclineClickHandler = async (id) => {
    
    console.log(id);
    fetch(`http://localhost:8000/reservationRequests/deny/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          return window.alert("Deny failed!");
        }

        fetchReservations();
        window.alert("Deny succesfull.");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during deny req.");
      });
  };
  const accomodationClickHandler = (availableDate) => {
    props.setSelectedDate(availableDate);
    navigate("/selectedDate");
  };

  const getHost = async (id) => {
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
      console.log(`host je: ${name}`)
      return name;
      
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  const fetchAccepted = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/reservations/getAllForAccommodation/${selectedAccomodation.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      );
      const data = await response.json();

      if (Array.isArray(data.ReservationDTO)) {
        const newAccommodations = [];
  
        for (const reservation of data.ReservationDTO) {
          const host = await getHost(reservation.UserId);
  
          newAccommodations.push({
            user: host,
            accomodation: reservation.AccommodationName,
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
      <div>
        <div className="divLabel1">
          <label className="label1">Available dates</label>

          <label className="label2">Reservation requests</label>
        </div>
      </div>
      <div className="dates-container">
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

          <form onSubmit={onSubmitClickHandler}>
            <div className="input-group">
              <label htmlFor="startDate">Start date</label>
              <input
                type="date"
                name="startDate"
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-group">
              <label htmlFor="endDate">End date</label>
              <input type="date" onChange={handleChange} name="endDate"></input>
            </div>
            <div className="input-group">
              <label htmlFor="price">Price</label>
              <input type="number" name="price" onChange={handleChange}></input>
            </div>
            <div className="input-group">
              <label htmlFor="pricingType">Pricing type</label>
              <select
                id="pricingType"
                name="pricingType"
                onChange={handleChange}
              >
                <option value="">Select value</option>
                <option value={0}>Per guest</option>
                <option value={1}>Per accommodation</option>
              </select>
            </div>

            <div class="button-group">
              <button className="item" type="submit">
                Add available date
              </button>
            </div>
          </form>
        </div>

        <div className="dates-table-container">
          <table className="dates-table ">
            <thead>
              <tr>
                <th>Start date</th>
                <th>End date</th>
                <th>Price</th>
                <th>Pricing type</th>
              </tr>
            </thead>
            <tbody>
              {availableDates.map((availableDate) => (
                <tr
                  onClick={() => accomodationClickHandler(availableDate)}
                  key={availableDate.id}
                >
                  <td>{availableDate.startDate}</td>
                  <td>{availableDate.endDate}</td>
                  <td>{availableDate.price}</td>
                  <td>
                    {availableDate.pricingType === "Per_Guest"
                      ? "Guest"
                      : "Accomodation"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dates-table-container">
          <table className="reservations-table ">
            <thead>
              <tr>
                <th>Start date</th>
                <th>End date</th>
                <th>User</th>
                <th>Cancels</th>
                <th>Accept</th>
                <th>Decline</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.startDate}</td>
                  <td>{reservation.endDate}</td>
                  <td>{reservation.user}</td>
                  <td>{reservation.cancels}</td>
                  <td>
                    <button
                      className="button-accept"
                      onClick={() => onAcceptClickHandler(reservation.id)}
                    >
                      Accept
                    </button>
                  </td>

                  <td>
                    <button
                      className="button-decline"
                      onClick={() => onDeclineClickHandler(reservation.id)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        <div className="game-history-container">
      <div className="game-history-table-container">
        <table className="game-history-table ">
          <thead>
            <tr>
              <th>Accomodation</th>
              <th>Guest</th>
              <th>Start date</th>
              <th>End date</th>
            </tr>
          </thead>
          <tbody>
            {acceptedRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.accomodation}</td>
                <td>{request.user}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      <button className="button-right_bottom" onClick={returnClickHandler}>
        Return
      </button>
    </div>
  );
};

export default SelectedAccomodation;
