import React from "react";
import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form, FieldArray } from "formik";
import classes from "./managerPage.module.css";
import { NavLink } from "react-router-dom";
import routes from "../../requests/routes";
import axios from "../../requests/axios";
import MatchCard from "../../generic components/match card/MatchCard";
import { useSelector } from "react-redux";


const Manager = (props) => {

  const [resp, setResp] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getFutureMatches() {
      const resp = await axios.get(
        routes.getFutureMatches
      );
      console.log(resp);
      setResp(resp.data);

      return resp.data;
    }
    getFutureMatches();
  }, []);
  
return (
  <div className={classes.manager}>
    <div className= {classes.buttonlist}>
      <NavLink to="/manager/addmatch" className={classes.buttons}>
        Add Match
      </NavLink>
      <NavLink to="/manager/addstadium" className={classes.buttons}>
        Add Stadium
      </NavLink>
      <NavLink to="/manager/addstaff" className={classes.buttons}>
        Add Staff
      </NavLink>
    </div>
    <div className={classes.cards}>
      {resp?.map((item, index) => (
        <NavLink to={"/Reservations/" + item._id}>
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

export default Manager;