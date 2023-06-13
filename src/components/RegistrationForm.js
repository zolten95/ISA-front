import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [registracijaDTO, setRegitracijaDTO] = useState({
    email: "",
    sifra: "",
    ime: "",
    prezime: "",
    adresa: "",
    grad: "",
    drzava: "",
    telefon: "",
    jmbg: 0,
    pol: "",
    zanimanje: "",
    ustanova: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");

  const onRegistrateClickHandler = async (event) => {
    event.preventDefault();

    if (registracijaDTO.sifra !== repeatPassword) {
      return window.alert("Passwords must match!");
    }

    fetch("http://localhost:8080/api/korisnik/registracija", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registracijaDTO),
    })
      .then((response) => {
        if (response.status === 400) {
          return window.alert("Registration failed!");
        }

        window.alert("Registration succesfull.");
        return navigate("/");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during registration.");
      });
  };

  const onCancelClickHandler = (event) => {
    return navigate("/");
  };

  const handleChange = (event) => {
    setRegitracijaDTO({
      ...registracijaDTO,
      [event.target.name]: event.target.value,
    });
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  return (
    <div class="registration-form-container">
      <div class="registration-form-wrapper">
        <form className="registration-form" onSubmit={onRegistrateClickHandler}>
          <div class="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="text"
              required
            />
          </div>
          <div class="input-group">
            <label htmlFor="sifra" className="item">
              Password
            </label>
            <input
              onChange={handleChange}
              name="sifra"
              type="password"
              required
            />
          </div>
          <div class="input-group">
            <label htmlFor="repeatPassword" className="item">
              Repeat password
            </label>
            <input
              onChange={handleRepeatPasswordChange}
              name="repeatPassword"
              type="password"
              required
            />
          </div>
          <div class="input-group">
            <label htmlFor="ime">Name</label>
            <input onChange={handleChange} name="ime" type="text" required />
          </div>
          <div class="input-group">
            <label htmlFor="prezime">Surname</label>
            <input
              onChange={handleChange}
              name="prezime"
              type="text"
              required
            />
          </div>

          <div class="input-group">
            <label htmlFor="adresa">Address</label>
            <input onChange={handleChange} name="adresa" type="text" required />
          </div>
          <div class="input-group">
            <label htmlFor="grad">City</label>
            <input onChange={handleChange} name="grad" type="text" required />
          </div>
          <div class="input-group">
            <label htmlFor="drzava">Counry</label>
            <input onChange={handleChange} name="drzava" type="text" required />
          </div>
          <div class="input-group">
            <label htmlFor="jmbg">JMBG</label>
            <input onChange={handleChange} name="jmbg" type="number" required />
          </div>
          <div class="input-group">
            <label htmlFor="pol">Gender:</label>
            <select id="userRole" name="pol" onChange={handleChange}>
              <option value="">Select gender</option>
              <option value="Muski">Male</option>
              <option value="Zenski">Female</option>
            </select>
          </div>
          <div class="input-group">
            <label htmlFor="zanimanje">Profession</label>
            <input onChange={handleChange} name="zanimanje" type="text" required />
          </div>
          <div class="input-group">
            <label htmlFor="ustanova">Company</label>
            <input onChange={handleChange} name="ustanova" type="text" required />
          </div>

          <div class="button-group">
            <button className="item" type="submit">
              Register
            </button>
            <button type="button" onClick={onCancelClickHandler}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
