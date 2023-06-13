import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import HomeButton from "./HomeButton";
import moment from "moment";


const MyProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [repeatPassword, setRepeatPassword] = useState("");
  const [exists, setExists] = useState(false)
  const upitnik = JSON.parse(localStorage.getItem("upitnik"))

  function getToken() {
    return localStorage.getItem("token");
  }


  useEffect(() => {
    getQuestionaire()
  }, []);

  const getQuestionaire = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/upitnik/getLastQuestionaire/${currentUser.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: getToken()
          },
        }
      );
      if(response.status === 400) {return}

      const data = await response.json()

      setExists(true)
      localStorage.setItem("upitnik", JSON.stringify(data))  
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };


  return (
    <div class="registration-form-container2">
      <div class="registration-form-wrapper">
        <form className="profile-form">
          <div class="input-group">
            <label htmlFor="email">Email</label>
            <input name="email" value={currentUser.email} type="text" disabled />
          </div>

          <div class="input-group">
            <label htmlFor="ime">Name</label>
            <input name="ime" type="text" value={currentUser.ime}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="prezime">Surname</label>
            <input name="prezime" type="text" value={currentUser.prezime}  disabled />
          </div>

          <div class="input-group">
            <label htmlFor="adresa">Address</label>
            <input name="adresa" type="text" value={currentUser.adresa}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="grad">City</label>
            <input name="grad" type="text" value={currentUser.grad}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="drzava">Counry</label>
            <input name="drzava" type="text" value={currentUser.drzava}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="jmbg">JMBG</label>
            <input name="jmbg" type="number" value={currentUser.jmbg}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="pol">Gender:</label>

            <input name="pol" type="text" value={currentUser.pol}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="zanimanje">Profession</label>
            <input name="zanimanje" type="text" value={currentUser.zanimanje}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="ustanova">Company</label>
            <input name="ustanova" type="text" value={currentUser.ustanova}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="penali">Penalties</label>
             <input name="upitnik" type="text" value={currentUser.penali}  disabled />
          </div>
          <div class="input-group">
            <label htmlFor="upitnik">Questionaire</label>
            {exists ?  <input name="upitnik" type="text" value={moment(upitnik.datumPopunjavanja).format("DD/MM/YYYY, h:mm")}  disabled /> :   
             <input name="upitnik" type="text" value={"No questionaire"}  disabled />}
          </div>
        </form>
      </div>
      <footer>
        <p>
         At 3 penalties during 1 month, you wont be able to reserve term for blood giving.
        </p>
      </footer>

      <HomeButton />
    </div>
  );
};

export default MyProfile;
