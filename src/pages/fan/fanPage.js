import React, { useEffect } from "react";
import classes from "./FanPage.module.css";
import SideBar from "./sidebar/SideBar";
import { Route, Routes } from "react-router-dom";
import EditProfile from "./EditProfile";
import ReserveTicketPage from "./ReserveTicket/ReserveTicketPage";
import Reservations from "./ReserveTicket/Reservations";

const FanPage = () => {
  return (
    <div className={classes.profile}>
      <aside>
        <SideBar />
      </aside>
      <main>
        <Routes>
          <Route
            path="/EditProfile"
            element={
              <div className={classes.infoFormAdjust}>
                <EditProfile />
              </div>
            }
          />
          <Route path="/Reservations" element={<Reservations />} />
        </Routes>
      </main>
    </div>
  );
};

export default FanPage;
