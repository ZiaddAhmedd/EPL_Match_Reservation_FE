import React, { useEffect } from "react";
import classes from "./matchCard.module.css";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import MyToaster from "../../generic components/toaster/MyToaster";
import { NavLink } from "react-router-dom";

const MatchCard = (props) => {
  const deleteReservation = async (event) => {
    try {
      // Stop the event propagation to prevent it from reaching the parent element
      const resp = await axios.delete(routes.cancelTicket, {
        data: { ticket: props.id },
      });
      console.log(resp);
      toast.success("Reservation cancelled");
    } catch (err) {
      toast.error(err.response.data.error);
    }
    event.stopPropagation();
  };

  return (
    <div className={classes.card}>
      <MyToaster />
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
      {props.inReserve && (
        <div className={classes.cardFooter}>
        <button
          className={classes.remove}
          type="button"
          onClick={(e) => deleteReservation(e)}
        >
          <DeleteIcon
            classname={classes.clear}
            sx={{ color: "#BB5824", fontSize: 20 }}
          />
        </button>
        <NavLink to={"/MatchDetails/" + props.matchId}>
          <div className={classes.btn}>
            <button className={classes.buttons}>View</button>
          </div>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default MatchCard;
