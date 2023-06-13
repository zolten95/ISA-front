import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import HomeButton from "./HomeButton";
import "../css/form.css"
import "../css/board.css"
import "../css/homePage.css"
import "../css/joinGame.css"
import "../css/table.css"


const HistoryOfVisits = () => {
    const currentUser =JSON.parse(localStorage.getItem("currentUser")) 
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [size, setSize] = useState(20);
    const [sort, setSort] = useState("Ascending");
    const [sortBy, setSortBy] = useState("datum");
    const [reqParams, setReqParams] = useState({
      field: sortBy,
      pageNo: currentPage,
      pageSize: size,
      sortMode: sort,
    });

    async function fetchData() {
        try {
          const token = localStorage.getItem("token");
          const userId = currentUser.id;
          const headers = {
            Authorization: `${token}`,
          };
          const response = await axios.get(
            `http://localhost:8080/api/donacijaKrvi/${userId}`,
            { headers, params: reqParams }
          );
          setHistory(response.data.content);
        } catch (error) {
          console.error(error);
        }
      }


  useEffect(() => {
    fetchData();
  }, [reqParams]);

  const sortSetter = (event) => {
    setSortBy(event.target.value)
    setReqParams({
      ...reqParams,
      field: event.target.value,
    });
  };

  const sortDirSetter = (event) => {
    setSort(event.target.value)
    setReqParams({
      ...reqParams,
      sortMode: event.target.value,
    });
  }

  const handleBack = () => {
    if(currentPage > 1) {

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
  return(
    <div>
    {history.length === 0 && (
      <p className="p-center">You have never been to our center!</p>
    )}
    {history.length !== 0 && (
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
            <option value="datum">Date</option>
            <option value="cena">Price</option>
            <option value="trajanje">Duration</option>
          </select>
          <select id="sort" className="sort-input" value={sort} name="sort" onChange={sortDirSetter}>
            <option value="Ascending">Ascending</option>
            <option value="Descending">Descending</option>
          </select>
        </div>
        <div className="game-history-table-container">
          <table className="complaintsAdmin">
          <thead>
            <tr>
              <th>Medical center</th>
              <th>Date and time</th>
              <th>Duration</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {history.map((term) => (
              <tr key={term.id}>
                <td>{term.imeMedicinskogCentra} </td>
                <td>{moment(term.datum).format("DD/MM/YYYY, h:mm")}</td>
                <td>{term.trajanje} minutes</td>
                <td>{term.cena} RSD</td>
              </tr>
            ))}
          </tbody>
        </table>
       
        </div>
        <HomeButton></HomeButton>
      </div>
    )}
  </div>

  )


}

export default HistoryOfVisits