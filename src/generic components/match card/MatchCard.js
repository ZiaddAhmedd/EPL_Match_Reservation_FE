import React, { useEffect } from "react";
import classes from "./matchCard.module.css";
import axios from "../../requests/axios";
import routes from "../../requests/routes";

const MatchCard = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.teams}>
        <div className={classes.team}>
          <img src={props.team1.flag} alt="team1" />
          <p>{props.team1.name}</p>
        </div>
        <div className={classes.team}>
          <img src={props.team2.flag} alt="team2" />
          <p>{props.team2.name}</p>
        </div>
      </div>
      <div className={classes.bottomSec}>
        <p>{props.matchTime}</p>
        <p>{props.date}</p>
        <p>{props.stadium.name}</p>
        </div>
    </div>
  );
};

export default MatchCard;
