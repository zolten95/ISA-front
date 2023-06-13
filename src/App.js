import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import HomePageGuest from "./components/HomePageGuest";
import HomePageHost from "./components/HomePageHost";
import MyProfile from "./components/MyProfile";
import CreateAccomodation from "./components/CreateAccomodation";
import AllAccomodations from "./components/AllAccomodations";
import DefinePrices from "./components/DefinePrices";
import PendingRequests from "./components/PendingRequests";
import SelectedAccomodation from "./components/SelectedAccomodation";
import SelectedDate from "./components/SelectedDate";
import FirstScreen from "./components/FirstScreen";
import AllAccomodationsGuest from "./components/AllAccomodationsGuest";
import SelectedAccomodationGuest from "./components/SelectedAccomodationGuest";
import AllPendingGuest from "./components/AllPendingGuest";
import AllAcceptedGuest from "./components/AllAcceptedGuest";
import HomePageRegisteredUser from "./components/HomePageRegisteredUser";
import AllBloodCenters from "./components/AllBloodCenters";
import Questionare from "./components/Questionaire";
import HistoryOfVisits from "./components/HistoryOfVisits";
import ReservedTerms from "./components/ReservedTerms";
import SelectedCenter from "./components/SelectedCenter";
import WriteComplaint from "./components/WriteComplaint";
import MyComplaints from "./components/MyComplaints";
import HomePageAdmin from "./components/HomePageAdmin";
import AdminUnansweredComplaints from "./components/AdminUnansweredComplaints";
import AdminAnsweredComplaints from "./components/AdminAnsweredComplaints";
import SelectedComplaint from "./components/SelectedComplaint";

function App() {
  const [selectedBloodCenter, setSelectedBloodCenter] = useState({})
  const [selectedDate, setSelectedDate] = useState({})
  const [guestSelectedAccomodation, setGuestSelectedAccomodation] = useState({})
  const [selectedComplaint, setSelectedComplaint] = useState({})

  return (
    <Routes>
      <Route index path="/" element={<LoginForm />}/>
      <Route path="/registration" element={<RegistrationForm />}/>
      <Route path="/homePageRegistered" element={<HomePageRegisteredUser/>} />
      <Route path="/bloodCenters"  element={<AllBloodCenters setSelectedBloodCenter={setSelectedBloodCenter}/>}/>
      <Route path="/questionaire" element={<Questionare/>} />
      <Route path="/historyOfVisits" element={<HistoryOfVisits/>} />
      <Route path="/reservedTerms" element={<ReservedTerms/>} />
      <Route path="/selectedBloodCenter" element={<SelectedCenter selectedBloodCenter={selectedBloodCenter} 
                setSelectedBloodCenter={setSelectedBloodCenter}/>} />
      <Route path="/complaint" element={<WriteComplaint/>}/>
      <Route path="/myComplaints" element={<MyComplaints/>}/>
      <Route path="/homePageAdmin" element={<HomePageAdmin/>}/>
      <Route path="/adminUnansweredComplaints" element={<AdminUnansweredComplaints setSelectedComplaint={setSelectedComplaint}/>} />
      <Route path="/adminAnsweredComplaints" element={<AdminAnsweredComplaints/>}/>
      <Route path="/selectedComplaint" element={<SelectedComplaint selectedComplaint={selectedComplaint} />} />

      <Route path="/homePageGuest" element={<HomePageGuest />}/>
      <Route path="/homePageHost" element={<HomePageHost />}/>
      <Route path="/myProfile" element={<MyProfile/>}/>
      <Route path="/createAccomodation" element={<CreateAccomodation/>}/>
      {/* <Route path="/allAccomodations"  element={<AllAccomodations setSelectedAccomodation={setSelectedAccomodation}/>}/>
      <Route path="/definePrices" element={<DefinePrices/>}/>
      <Route path="/acceptedReservations" element={<PendingRequests/>}/>
      <Route path="/selectedAccomodation" element={<SelectedAccomodation setSelectedAccomodation={setSelectedAccomodation} 
                            setSelectedDate={setSelectedDate}  selectedAccomodation = {selectedAccomodation}/>} /> */}
      <Route path="/selectedDate" element={<SelectedDate setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>} />
      <Route path="/allAccomodationsGuest" element={<AllAccomodationsGuest setGuestSelectedAccomodation={setGuestSelectedAccomodation}/>}/>
      <Route path="/selectedAccomodationGuest" element={<SelectedAccomodationGuest guestSelectedAccomodation={guestSelectedAccomodation}
                            setGuestSelectedAccomodation={setGuestSelectedAccomodation} />} />
      <Route path="/allPendingGuest" element={<AllPendingGuest/>} />
      <Route path="/allAcceptedGuest" element={<AllAcceptedGuest/>} />
    </Routes>
  );
}

export default App;
