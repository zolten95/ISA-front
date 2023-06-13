import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";

const FirstScreen = () => {
  const navigate = useNavigate();
  const [accommodationSearchDTO, setAccommodationSearchDTO] = useState({
    city: "",
    guestNum: 0,
    startDate: null,
    endDate: null,
  });
  const [accomodations, setAccomodations] = useState([]);
  const [click, setClick] = useState(0)
  const [searchOn, setSearchOn] = useState(false)

  useEffect(() => {
    fetchProducts();
  }, [click]);
  
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/accommodation", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      if (Array.isArray(data.accommodations)) {
        const newAccommodations = [];
  
        for (const accommodation of data.accommodations) {
          const host = await getHost(accommodation.userId);
  
          newAccommodations.push({
            user: host,
            name: accommodation.name,
            city: accommodation.city,
            address: accommodation.address,
            benefits: accommodation.benefits,
            minGuests: accommodation.minGuests,
            maxGuests: accommodation.maxGuests,
            automaticAccept: accommodation.automaticAccept,
          });
        }
  
        setAccomodations(newAccommodations);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
    }
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
      return name;
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  

  const handleChange = (event) => {
    let temp = "Z";

    if (event.target.name === "startDate") {
      const inputDateTime = event.target.value;
      const date = new Date(inputDateTime);

      const outputDateTime = date.toISOString();
      const slicedDateTime = outputDateTime.slice(0, -5);
      //console.log(slicedDateTime)
      const e = slicedDateTime + temp;
      console.log(e);
      setAccommodationSearchDTO({
        ...accommodationSearchDTO,
        startDate: e,
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
      setAccommodationSearchDTO({
        ...accommodationSearchDTO,
        endDate: g,
      });
      return;
    }

    setAccommodationSearchDTO({
      ...accommodationSearchDTO,
      [event.target.name]: event.target.value,
    });
  };

  const searchHandler = async () => {
    setClick(click)
    const response = await fetch("http://localhost:8000/accommodation/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(accommodationSearchDTO),
    })
      
    const data = await response.json();
      if (Array.isArray(data.accommodationDto)) {
        const newAccommodations = [];
  
        for (const accommodation of data.accommodationDto) {
          const host = await getHost(accommodation.userId);
  
          newAccommodations.push({
            user: host,
            name: accommodation.name,
            city: accommodation.city,
            address: accommodation.address,
            benefits: accommodation.benefits,
            minGuests: accommodation.minGuests,
            maxGuests: accommodation.maxGuests,
            automaticAccept: accommodation.AutomaticAccept,
            price: accommodation.totalPrice + ""
          });
        }
        
        setSearchOn(true)
        setAccomodations(newAccommodations);
        console.log(accomodations)
      }
      
  }

  const loginClickHandler = () => {
    navigate("/login");
  };

  const refreshClickHandler = () => {
    document.getElementsByName("city")[0].value = "";
    document.getElementsByName("guestNum")[0].value = "";
    document.getElementsByName("startDate")[0].value = "";
    document.getElementsByName("endDate")[0].value = "";
    setAccommodationSearchDTO({
      city: "",
      guestNum: 0,
      startDate: null,
      endDate: null,
    });
    setSearchOn(false)
    fetchProducts()
    setClick(click - 1)
  }

  return (
    <div>
      <div className="firstpage-container">
        <div>
          <label className="input-label" htmlFor="city">
            City:
          </label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            required
          ></input>

          <label className="input-label" htmlFor="guestNum">
            Guests:
          </label>
          <input
            type="number"
            name="guestNum"
            onChange={handleChange}
            required
          ></input>

          <label className="input-label" htmlFor="startDate">
            Start date:
          </label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            required
          ></input>

          <label className="input-label" htmlFor="endDate">
            End date:
          </label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            required
          ></input>

          <button className="button-search" onClick={searchHandler}>Search</button>
          <button className="button-refresh" onClick={refreshClickHandler}>Refresh</button>
        </div>
        <div className="game-history-table-container">
          <table className="game-history-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Benefits</th>
                <th>Min, max guests</th>
                <th>Automatic accept</th>
                {searchOn===false && <th>Host</th>}
                {searchOn===true && <th>Price</th>}
              </tr>
            </thead>
            <tbody>
              {accomodations.map((accommodation) => (
                <tr key={accommodation.id}>
                  <td>{accommodation.name}</td>
                  <td>{accommodation.address + ", " + accommodation.city}</td>
                  <td>{accommodation.benefits}</td>
                  <td>
                    {accommodation.minGuests + ", " + accommodation.maxGuests}
                  </td>
                   <td>
                    {accommodation.automaticAccept === false ? `false` : `true`}
                  </td>
                  {searchOn===false &&
                  <td>{accommodation.user}</td>
                  }
                  {searchOn===true &&
                  <td>{accommodation.price}</td>
                  }

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="login-button" onClick={loginClickHandler}>
        Login
      </button>
    </div>
  );
};

export default FirstScreen;
// string city = 1;
// uint32 guestNum = 2;
// google.protobuf.Timestamp startDate = 3;
// google.protobuf.Timestamp endDate = 4;
