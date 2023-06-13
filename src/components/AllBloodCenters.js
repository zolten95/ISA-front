import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import "../css/table.css";
import axios from "axios";
import HomeButton from "./HomeButton";

const AllBloodCenters = (props) => {
  const navigate = useNavigate();
  const [bloocCenters, setBloodCenters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = useState(2);
  const [sort, setSort] = useState("Ascending");
  const [numberOfCenters, setNumberOfCenters] = useState(0);
  const [sortBy, setSortBy] = useState("imeCentra");
  const [pages, setPages] = useState([]);
  const [reqParams, setReqParams] = useState({
    field: sortBy,
    pageNo: currentPage,
    pageSize: size,
    sortMode: sort,
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  function getToken() {
    return localStorage.getItem("token");
  }

  const [accommodationSearchDTO, setAccommodationSearchDTO] = useState({
    city: "",
    guestNum: 0,
    startDate: null,
    endDate: null,
  });
  const [click, setClick] = useState(0);
  const [searchOn, setSearchOn] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, reqParams]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/medicinskiCentar/getAllSortirano",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
          params: reqParams,
        }
      );
      const data = await response.data.content;
      if (Array.isArray(data)) {
        const newMedicalCenters = data.map((medicalCenter) => {
          return {
            id: medicalCenter.id,
            name: medicalCenter.imeCentra,
            address: medicalCenter.adresaCentra,
            description: medicalCenter.opisCentra,
            avgGrade: medicalCenter.prosecnaOcena,
          };
        });

        setBloodCenters(newMedicalCenters);
        console.log(bloocCenters);
      }
    } catch (error) {
      console.log("Error fetching medical centers:", error);
    }
  };

  //   const searchHandler = async () => {
  //     setSearchOn(true)
  //     setClick(click)
  //     const response = await fetch("http://localhost:8000/accommodation/search", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(accommodationSearchDTO),
  //     })

  //     const data = await response.json();
  //       if (Array.isArray(data.accommodationDto)) {
  //         const newAccommodations = [];

  //         for (const accommodation of data.accommodationDto) {

  //           newAccommodations.push({
  //             name: accommodation.name,
  //             city: accommodation.city,
  //             address: accommodation.address,
  //             benefits: accommodation.benefits,
  //             minGuests: accommodation.minGuests,
  //             maxGuests: accommodation.maxGuests,
  //             automaticAccept: accommodation.automaticAccept,
  //             price: accommodation.totalPrice + ""
  //           });
  //         }

  //         console.log(newAccommodations)
  //         setAccomodations(newAccommodations);
  //       }

  //   }

  const homeClickHandler = () => {
    navigate("/homePageHost");
  };

  const sortSetter = (event) => {
    setSortBy(event.target.value);
    setReqParams({
      ...reqParams,
      field: event.target.value,
    });
  };

  const sortDirSetter = (event) => {
    setSort(event.target.value);
    setReqParams({
      ...reqParams,
      sortMode: event.target.value,
    });
  };

  const handleBack = () => {
    if (currentPage > 1) {
      const updatedPage = currentPage - 1;
      setCurrentPage(updatedPage);
      setReqParams({
        ...reqParams,
        pageNo: updatedPage,
      });
    }
  };

  const handleNext = () => {
    const updatedPage = currentPage + 1;
    setCurrentPage(updatedPage);
    setReqParams({
      ...reqParams,
      pageNo: updatedPage,
    });
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
    fetchProducts();
    setSearchOn(false);
    setClick(click - 1);
  };

  const bloodCenterClickHandler = (bloodCenter) => {
    props.setSelectedBloodCenter(bloodCenter);
    navigate("/selectedBloodCenter");
  };

  return (
    <div>
      <div className="firstpage-container">
        <div className="navbar">
          <p>Sort by: </p>
          <select
            id="sortBy"
            value={sortBy}
            name="sortBy"
            onChange={sortSetter}
            className="sort-input"

          >
            <option value="imeCentra">Center name</option>
            <option value="adresaCentra">Adress</option>
            <option value="prosecnaOcena">Average rating</option>
          </select>
          <select id="sort" value={sort} className="sort-input"  name="sort" onChange={sortDirSetter}>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
        <div className="game-history-table-container">
          <table className="complaintsAdmin">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Description</th>
                <th>Average Rating</th>
              </tr>
            </thead>
            <tbody>
              {bloocCenters.map((bloocCenter) => (
                <tr
                  onClick={() => bloodCenterClickHandler(bloocCenter)}
                  key={bloocCenter.id}
                >
                  <td>{bloocCenter.name}</td>
                  <td>{bloocCenter.address}</td>
                  <td>{bloocCenter.description}</td>
                  <td>{bloocCenter.avgGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
      <HomeButton />
    </div>
  );
};

export default AllBloodCenters;
