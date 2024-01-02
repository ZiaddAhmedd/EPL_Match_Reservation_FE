import React from "react";
import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form, FieldArray } from "formik";
import classes from "./managerPage.module.css";
import * as Yup from "yup";
import axios from "axios";
import { NavLink } from "react-router-dom";


const Manager = (props) => {
  
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
  </div>
);
};

export default Manager;