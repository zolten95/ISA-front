import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginDTO, setLoginDTO] = useState({
    email: "",
    sifra: "",
  });

  const handleChange = (event) => {
    setLoginDTO({
      ...loginDTO,
      [event.target.name]: event.target.value,
    });
  };

  const onLoginClickHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/api/korisnik/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(loginDTO),
    });
    if (response.status !== 200) {
      return window.alert("Wrong username or password!");
    }
    const data = await response.json();
    const token = `Bearer ${data.token}`;
    localStorage.setItem("token", token);
    const currentUserResponse = fetch(
      `http://localhost:8080/api/korisnik/getCurrentUser/${loginDTO.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const currentUser = JSON.stringify(data);

        localStorage.setItem("currentUser", currentUser);

        if(data.tipKorisnika === "RegistrovaniKorisnik") {

          return navigate("/homePageRegistered");
        }
        if(data.tipKorisnika === "Admin"){
          return navigate("/homePageAdmin")
        }

      });
  };

  const onRegistrateClickHandler = () => {
    return navigate("/registration");
  };

  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={onLoginClickHandler}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} name="email" type="text" required />
          </div>
          <div className="input-group">
            <label htmlFor="sifra" className="item">
              Sifra
            </label>
            <input
              onChange={handleChange}
              name="sifra"
              type="password"
              required
            />
          </div>
          <div className="button-group">
            <button className="item" type="submit">
              Login
            </button>
            <button type="button" onClick={onRegistrateClickHandler}>
              Dont have account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
