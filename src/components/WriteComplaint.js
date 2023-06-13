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

const WriteComplaint = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [bloocCenters, setBloodCenters] = useState([]);
  const [selectedBloodCenter, setSelectedBloodCenter] = useState({});
  const [medicalWorkers, setMedicalWorkers] = useState([]);
  const [selectedMedicalWorker, setSelectedMedicalWorker] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const [zalbaText, setZalbaText] = useState("");

  function getToken() {
    return localStorage.getItem("token");
  }

  useEffect(() => {
    fetchProducts();
    fetchMedicalWorkers();
    // console.log(bloocCenters);
    // console.log(medicalWorkers);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/medicinskiCentar/",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      );
      const data = await response.data;
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
        //    console.log(newMedicalCenters);
      }
    } catch (error) {
      console.log("Error fetching medical centers:", error);
    }
  };

  const fetchMedicalWorkers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/korisnik/getMedicinskoOsoblje",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: getToken(),
          },
        }
      );
      const data = await response.data;
      if (Array.isArray(data)) {
        const newWorkers = data.map((worker) => {
          return {
            id: worker.id,
            name: worker.ime,
            surname: worker.prezime,
            center: worker.medicinskiCentar.imeCentra,
          };
        });

        setMedicalWorkers(newWorkers);
      }
    } catch (error) {
      console.log("Error fetching medical centers:", error);
    }
  };

  const sendCenterComplaint = async () => {
    console.log(selectedBloodCenter);
    if (!selectedBloodCenter) {
      return window.alert("Please select a blood center.");
    }
    if (zalbaText === "") {
      return window.alert("Please write complaint text.");
    }

    const zalbaCentarDTO = {
      text: zalbaText,
      medCentarID: selectedBloodCenter,
      pacijentID: currentUser.id,
    };

    fetch("http://localhost:8080/api/zalba/addZalbaCentar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getToken(),
      },
      body: JSON.stringify(zalbaCentarDTO),
    })
      .then((response) => {
        if (response.status === 400) {
          return window.alert("You cant write complaint for center!");
        }

        window.alert("Adding complaint succesfull.");
        return navigate("/myComplaints");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during adding.");
      });
  };

  const sendWorkerComplaint = async () => {
    console.log(selectedMedicalWorker);
    if (!selectedMedicalWorker) {
      return window.alert("Please select a medical worker.");
    }

    if (zalbaText === "") {
      return window.alert("Please write complaint text.");
    }
    const zalbaOsobljeDTO = {
      text: zalbaText,
      pacijentID: currentUser.id,
      osobljeID: selectedMedicalWorker,
    };

    fetch("http://localhost:8080/api/zalba/addZalbaOsoblje", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getToken(),
      },
      body: JSON.stringify(zalbaOsobljeDTO),
    })
      .then((response) => {
        if (response.status === 400) {
          return window.alert("You cant write complaint for worker!");
        }

        window.alert("Adding complaint succesfull.");
        return navigate("/myComplaints");
      })
      .catch((error) => {
        console.error(error);
        window.alert("An error occurred during adding.");
      });
  };

  const onAddComplaintClickHandler = async (event) => {
    if (selectedType === "Blood center") {
      await sendCenterComplaint();
    }
    if (selectedType === "Medical worker") {
      await sendWorkerComplaint();
    }
  };

  const handleSelectChange = (event) => {
    if(selectedType === "Blood center"){

        setSelectedBloodCenter(event.target.value);
    }

    if(selectedType === "Medical worker"){
        setSelectedMedicalWorker(event.target.value);

    }
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedBloodCenter(null);
    setSelectedMedicalWorker(null);
    setZalbaText("");
  };

  const handleChange = (event) => {
    setZalbaText(event.target.value);
  };
  
  return (
    <div className="firstpage-container">
      <div className="glavniZalba">
        <div>
          <select className="select2" onChange={handleTypeChange}>
            <option key={null} value={null}>
              Complaint for
            </option>
            <option key="Blood center" value="Blood center">
              Blood center
            </option>
            <option key="Medical worker" value="Medical worker">
              Medical worker
            </option>
          </select>

          {selectedType === "Blood center" && (
            <select className="select2" onChange={handleSelectChange}>
              <option key={null} value={null}>
                Select blood center
              </option>
              {bloocCenters.map((bloocCenter) => (
                <option key={bloocCenter.id} value={bloocCenter.id}>
                  {bloocCenter.name}
                </option>
              ))}
            </select>
          )}

          {selectedType === "Medical worker" && (
            <select className="select2" onChange={handleSelectChange}>
              <option key={null} value={null}>
                Select medical worker
              </option>
              {medicalWorkers.map((medicalWorker) => (
                <option key={medicalWorker.id} value={medicalWorker.id}>
                  {medicalWorker.name +
                    " " +
                    medicalWorker.surname +
                    ", " +
                    medicalWorker.center}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <button className="zalbadugme" onClick={onAddComplaintClickHandler}>
            Send complaint
          </button>
        </div>
      </div>

      <div className="zalbaTextDiv">
        <input onChange={handleChange} type="text" className="zalbaText" required></input>
      </div>
      <HomeButton />
    </div>
  );
};

export default WriteComplaint;
