import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import HomeButton from "./HomeButton";
import "../css/form.css";
import "../css/board.css";
import "../css/homePage.css";
import "../css/joinGame.css";
import "../css/table.css";
import "../css/complaints.css";

const MyComplaints = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const shop = JSON.parse(localStorage.getItem("shop"));
  const [order, setOrder] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [amount, setAmount] = useState(0);

  const [neodgovorene, setNeodgovorene] = useState([]);
  const [odgovorene, setOdgovorene] = useState([]);

  useEffect(() => {
    fetchNeodgovorene();
    fetchOdgovorene();
  }, []);

  const fetchNeodgovorene = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/zalba/getNeodgovoreneZalbeKorisnik/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.data;
      if (Array.isArray(data)) {
        const noveZalbe = data.map((zalba) => {
          return {
            id: zalba.id,
            center:
              zalba.medicinskiCentar !== null
                ? zalba.medicinskiCentar.imeCentra
                : "",
            osoblje:
              zalba.medicinskoOsoblje !== null
                ? zalba.medicinskoOsoblje.ime +
                  " " +
                  zalba.medicinskoOsoblje.prezime
                : "",
            text: zalba.text,
            background: false,
          };
        });
        console.log(noveZalbe);
        setNeodgovorene(noveZalbe);
      }
    } catch (error) {
      console.log("Error fetching medical centers:", error);
    }
  };

  const fetchOdgovorene = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/zalba/getOdgovoreneZalbeKorisnik/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.data;
      if (Array.isArray(data)) {
        const noveZalbe = data.map((z) => {
          return {
            zalbaId: z.zalba.id,
            odgovor: z.odgovorZalba.text,
          };
        });

        const dodaj = data.map((z) => {
          return {
            id: z.zalba.id,
            center:
              z.zalba.medicinskiCentar !== null
                ? z.zalba.medicinskiCentar.imeCentra
                : "",
            osoblje:
              z.zalba.medicinskoOsoblje !== null
                ? z.zalba.medicinskoOsoblje.ime +
                  " " +
                  z.zalba.medicinskoOsoblje.prezime
                : "",
            text: z.zalba.text,
            background: true,
          };
        });
        console.log(dodaj);
        setOdgovorene(noveZalbe);
        setNeodgovorene((prevNeodgovorene) => prevNeodgovorene.concat(dodaj));
      }
    } catch (error) {
      console.log("Error fetching medical centers:", error);
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch(
        `https://localhost:7220/api/shoporder/add/${shop.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      setOrder(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const addItem = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7220/api/shoporder/addOrderItem/${order.id}/${id}/${amount}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status !== 200) {
        return window.alert("Fail");
      }
      fetchItems();
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(
        `https://localhost:7220/api/shoporder/getAllOrderItemsForOrder/${order.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      setOrderItems(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://localhost:7220/api/product/getAll`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  function trimDate(date) {
    if (date === undefined) {
      return;
    }
    return date.slice(0, -22);
  }

  function onAmountChange(event) {
    setAmount(event.target.value);
    console.log(amount);
  }

  function onSave() {
    setOrder({});
    setOrderItems([]);
    setProducts([]);
    setAmount(0);
    navigate("/productsInShop");
  }

  return (
    <div>
      <div className="main-div">
        <div className="column-1">
          <div className="prvi-div">
            <div className="div-header">
              <label className="label-header">Your complaints</label>
            </div>
            <div className="game-history-table-container">
              <table className="game-history-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Blood center</th>
                    <th>Medical worker</th>
                    <th>Text</th>
                  </tr>
                </thead>
                <tbody>
                  {neodgovorene.map((zalba) => (
                    <tr
                      key={zalba.id}
                      className={zalba.background ? "green-row" : ""}
                    >
                      <td>{zalba.id}</td>
                      <td>{zalba.center != null ? zalba.center : ""}</td>
                      <td>{zalba.osoblje !== null ? zalba.osoblje : ""}</td>
                      <td>{zalba.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="column-2">
          <div className="prvi-div">
            <div className="div-header">
              <label className="label-header2">Answered complaints</label>
            </div>
            <table className="game-history-table2">
              <thead>
                <tr>
                  <th>Comlaint ID</th>
                  <th>Text</th>
                </tr>
              </thead>
              <tbody>
                {odgovorene.map((z) => (
                  <tr key={z.id}>
                    <td>{z.zalbaId}</td>
                    <td>{z.odgovor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <HomeButton></HomeButton>
    </div>
  );
};

export default MyComplaints;
