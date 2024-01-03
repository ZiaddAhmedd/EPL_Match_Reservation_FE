import React, { useEffect } from "react";
import "../../../index.css";
import classes from "./reservations.module.css";
import routes from "../../../requests/routes";
import axios from "../../../requests/axios";
import { useSelector } from "react-redux";
import MatchCard from "../../../generic components/match card/MatchCard";
import { NavLink } from "react-router-dom";

const Reservations = () => {
  const [resp, setResp] = React.useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getReservations() {
      const resp = await axios.get(
        routes.getUsersReservations + user.username + "/reservations"
      );
      console.log(resp);
      setResp(resp.data.reservations);

      return resp.data;
    }
    getReservations();
  }, []);

  return (
    <div className={classes.container}>
      <h1 className="title">Reservations</h1>
      <div className={classes.cards}>
        {resp?.map((item, index) => (
          <NavLink to={"/MatchDetails/" + item._id}>
            <MatchCard
              key={index}
              team1={item.firstTeam}
              team2={item.secondTeam}
              date={item.dateTime?.substring(0, 10)}
              matchTime={item.dateTime?.substring(11, 16)}
              stadium={item.stadium}
            />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Reservations;
