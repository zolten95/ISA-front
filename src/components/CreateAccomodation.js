import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

const CreateAccomodation = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [accommodation, setCreateAccommodationRequest] = useState({
    id : "",
    userId: currentUser._id,
    name : "",
    city : "",
    address : "",
    benefits : "",
    minGuests : 0,
    maxGuests : 0, 
    automaticAccept : false
  })
  const homeClickHandler = () => {
    navigate("/homePageHost");
  };
 
  function getToken() {
    return localStorage.getItem("token");
  }

  const onAddClickHandler = async (event) => {
    event.preventDefault();


    fetch("http://localhost:8000/accommodation", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization:  getToken()},
      body: JSON.stringify(accommodation),

    })
      .then((response) => {
        if (response.status !== 200) {
          return window.alert("Adding failed!");
        }

        window.alert("Adding succesfull.");
        return navigate("/allAccomodations");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during adding accomodation.");
      });
  };

  const handleChange = (event) => {
    if(event.target.name === "automaticAccept"){
        console.log(event.target.value)
        if(event.target.value === "true"){

            setCreateAccommodationRequest({
                ...accommodation,
                automaticAccept: true,
            });
            console.log(`dosao 1 ${accommodation.automaticAccept}`)
            return
        } else if (event.target.value === "false"){
            setCreateAccommodationRequest({
                ...accommodation,
                automaticAccept: false,
            });
            console.log(`dosao 2 ${accommodation.automaticAccept}`)
            return
        }
        // console.log(accommodation)
        // return;
    }
    setCreateAccommodationRequest({
      ...accommodation,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
 <div class="registration-form-container">
      <div class="registration-form-wrapper">
        <form className="registration-form" onSubmit={onAddClickHandler}>
          <div class="input-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              required
            />
          </div>
         
          <div class="input-group">
            <label htmlFor="city">City</label>
            <input onChange={handleChange} name="city" type="text" required />
          </div>
          <div class="input-group">
            <label htmlFor="address">Address</label>
            <input
              onChange={handleChange}
              name="address"
              type="text"
              required
            />
          </div>

          <div class="input-group">
            <label htmlFor="benefits">Benefits</label>
            <input onChange={handleChange} name="benefits" type="text" required />
          </div>
          <div class="input-group">
            <label htmlFor="minGuests">MinGuests</label>
            <input onChange={handleChange} name="minGuests" type="number" required />
          </div>
          <div class="input-group">
            <label htmlFor="maxGuests">MaxGuests</label>
            <input onChange={handleChange} name="maxGuests" type="number" required />
          </div>
          <div class="input-group">
            <label htmlFor="automaticAccept">Automatic accept:</label>
            <select id="automaticAccept" name="automaticAccept" onChange={handleChange}>
              <option value="">Select value</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <div class="button-group">
            <button className="item" type="submit">
              Add accomodation
            </button>
            
          </div>
        </form>
      </div>
    </div>
      <button className="button-right_bottom" onClick={homeClickHandler}>
        Home
      </button>
    </div>
  );
};

export default CreateAccomodation;
