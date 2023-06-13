import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";
import "../css/board.css";

const SelectedDate = (props) => {
  const navigate = useNavigate();
  const selectedDate = props.selectedDate;
  const [availableDatedto, setAvailableDate] = useState({
    accommodation: selectedDate.accommodation,
    startDate: selectedDate.startDate,
    endDate: selectedDate.endDate,
    price: selectedDate.price,
    pricingType: selectedDate.pricingType,
  });

  const oldStartDate = availableDatedto.startDate;
  const oldEndDate = availableDatedto.endDate;
  function getToken() {
    return localStorage.getItem("token");
  }

  const onCancelClickHandler = () => {
    props.setSelectedDate({});
    navigate("/allAccomodations");
  };

  const handleChange = (event) => {
    let temp = "Z";
    if (event.target.name === "pricingType") {
      if (event.target.value == "0") {
        setAvailableDate({
          ...availableDatedto,
          [event.target.name]: 0,
        });
      } else {
        setAvailableDate({
          ...availableDatedto,
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
      console.log(e);
      setAvailableDate({
        ...availableDatedto,
        startDate: e,
      });
      console.log(availableDatedto);
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
      setAvailableDate({
        ...availableDatedto,
        endDate: g,
      });
      return;
    }

    setAvailableDate({
      ...availableDatedto,
      [event.target.name]: event.target.value,
    });
  };

  const onUpdateClickHandler = async (event) => {
    event.preventDefault();
    console.log(selectedDate)
    fetch(
      `http://localhost:8000/availableDate/${selectedDate.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify(availableDatedto),
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          return window.alert("Updating failed because term has reservation!");
        }
        window.alert("Updating term succesfull.");
        props.setSelectedDate({})
        navigate("/selectedAccomodation")
        //return fetchAvailableDates
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during adding accomodation.");
      });
  };

  return (
    <div class="registration-form-container">
      <div class="registration-form-wrapper">
        <div className="input-group">
            <label>{`Old dates:`}</label>
            <input type="text" value={oldStartDate +"," +oldEndDate } disabled></input>
        </div>
        <form onSubmit={onUpdateClickHandler}>
          <div className="input-group">
            <label htmlFor="startDate">Start date</label>
            <input type="date" name="startDate" onChange={handleChange}></input>
          </div>
          <div className="input-group">
            <label htmlFor="endDate">End date</label>
            <input type="date" onChange={handleChange} name="endDate"></input>
          </div>
          <div className="input-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={availableDatedto.price}
              onChange={handleChange}
            ></input>
          </div>
          <div className="input-group">
            <label htmlFor="pricingType">Pricing type</label>
            <select
              id="pricingType"
              name="pricingType"
              onChange={handleChange}
              required
            >
              <option value="">Select value</option>
              <option value={0}>Per guest</option>
              <option value={1}>Per accommodation</option>
            </select>
          </div>

          <div class="button-group">
            <button className="item" type="submit">
              Update available date
            </button>
            <button className="item" onClick={onCancelClickHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SelectedDate;
