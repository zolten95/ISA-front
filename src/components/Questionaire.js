import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";

const Questionare = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [upitnikDTO, setUpitnikDTO] = useState({
    pacijentID: currentUser.id,
    pitanje1: "",
    pitanje2: "",
    pitanje3: "",
    pitanje4: "",
    pitanje5: "",
    pitanje6: "",
    pitanje7: "",
    pitanje8: "",
    pitanje9: "",
    pitanje10: "",
    pitanje11: "",
    pitanje12: "",
    pitanje13: "",
    pitanje14: "",
    pitanje15: "",
  });

  function getToken() {
    return localStorage.getItem("token");
  }

  const onRegistrateClickHandler = async (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/upitnik", {
      method: "POST",
      headers: { "Content-Type": "application/json", authorization: getToken() },
      body: JSON.stringify(upitnikDTO),
    })
      .then((response) => {
        if (response.status === 400) {
          return window.alert("Questionaire adding failed!");
        }

        window.alert("Adding succesfull.");
        return navigate("/myProfile");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during adding.");
      });
  };

  const onCancelClickHandler = (event) => {
    return navigate("/homePageRegistered");
  };

  const handleChange = (event) => {
    setUpitnikDTO({
      ...upitnikDTO,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div class="registration-form-container">
      <div class="registration-form-wrapper">
        <form className="questionaire-form" onSubmit={onRegistrateClickHandler}>
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje1">Da li ste do sada davali krv?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje1"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje1"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>

          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje2">Da li ste ikada bili odbijeni kao davalac krvi?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje2"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje2"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>

          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje3">Da li ste nešto jeli pre dolaska na davanje krvi?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje3"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje3"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje4">Da li se bavite opasnim zanimanjem ili hobijem?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje4"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje4"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje5">Da li uzimate lekove redovno?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje5"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje5"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje6">Da li ste vadili zub u prethodnih 7 dana?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje6"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje6"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje7">Da li ste primili neku vakcinu u prethodnih 6 meseci ?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje7"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje7"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          

          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje8">Da li ste alergični na nešto?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje8"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje8"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje9">Da li ste u poslednjih 6 meseci naglo izgubili na težini?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje9"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje9"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje10">Da li dugo krvarite posle zadobijene povrede?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje10"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje10"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje11">Da li ste pili alkohol u prethodnih 6 sati?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje11"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje11"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje12">Da li ste u prethonih 6 meseci imali neku operaciju?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje12"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje12"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje13">Da li ste bolovali/bolujete od hepatitisa A, B ili C?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje13"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje13"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje14">Da li ste koristili bilo koju drogu?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje14"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje14"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          
          <div class="input2-group">
            <label className="upitnik-labela" htmlFor="pitanje15">Da li ste u prethodnih 6 meseci živeli u inostranstvu?</label>
            <div>
          <label className="odgovor">
            <input
              type="radio"
              name="pitanje15"
              onChange={handleChange}
              value="da"
              required
            />
            {"Da    "}  
          </label>
          <label className="odgovor">
            <input
              type="radio"
              onChange={handleChange}
              name="pitanje15"
              value="ne"
              required
            />
            Ne
          </label>
        </div>
          </div>
          



          <div class="button-group">
            <button className="item" type="submit">
              Add
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

export default Questionare;
