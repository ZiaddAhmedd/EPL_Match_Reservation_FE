import React, { useEffect } from "react";
import classes from "./matchCard.module.css";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import MyToaster from "../../generic components/toaster/MyToaster";

const MatchCard = (props) => {

  const deleteReservation = async () => {
    try {
      const resp = await axios.delete(routes.cancelTicket ,{"ticket":props.id});
      toast.success("Reservation cancelled");
      window.location.reload();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className={classes.card}>
    <MyToaster/>
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
        <button
          className={classes.remove}
          type="button"
          onClick={deleteReservation}
        >
          <DeleteIcon
            classname={classes.clear}
            sx={{ color: "#BB5824", fontSize: 20 }}
          />
        </button>
      )}
    </div>
  );
};

export default MatchCard;
