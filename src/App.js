import { Route, Routes } from "react-router-dom";
import Footer from "./layouts/footer/Footer";
import NavBar from "./layouts/nav/NavBar";
import ForgetPasswordPage from "./pages/authentication/ForgetPasswordPage";

// import SubscribeCard from "./generic components/subscribe/SubscribeCard";
import NotFound from "./layouts/notFound/NotFound";
import Home from "./pages/home/homePage";
import Manager from "./pages/manager/managerPage";

import AddMatch from "./pages/manager/addMatch";
import AddStadium from "./pages/manager/addStadium";
import AddStaff from "./pages/manager/addStaff";
import FanPage from "./pages/fan/FanPage";
import EditProfile from "./pages/fan/EditProfile";
import ReserveTicketPage from "./pages/fan/ReserveTicket/ReserveTicketPage";
import MatchDetails from "./generic components/match details/MatchDetails";

function App() {


  return (
    <>
      {/* <SubscribeCard open={open} setOpen={setOpen} /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/manager" element={<Manager />} exact></Route>
        <Route path="/manager/addmatch" element={<AddMatch />} exact></Route>
        <Route path="/manager/addstadium" element={<AddStadium />} exact></Route>
        <Route path="/manager/addstaff" element={<AddStaff />} exact></Route>
        <Route path="/fan/:id/*" element={<FanPage />} exact></Route>
        <Route path="Fan/ReserveTicket" element={<ReserveTicketPage />} exact></Route>
        <Route path="/MatchDetails/:id" element={<MatchDetails />} />
        <Route path="/forgetPassword/:id" element={<ForgetPasswordPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
