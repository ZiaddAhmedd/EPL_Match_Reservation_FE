import React from "react";
import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form, FieldArray } from "formik";
import classes from "./form.module.css";
import * as Yup from "yup";
import axios from "axios";
import { Add } from "@mui/icons-material";


const AddStadium = (props) => {

    const initialValues = {
    venue: '',
    numRows: '',
    numSeats: '',
    };

    const validationSchema = Yup.object().shape({
        // venue: Yup.string().required(),
        // numSeats: Yup.string().min(1).required(),
        // numRows: Yup.string().min(1).max(20).required(),
    });

    const onformSubmit = (data) => {
    console.log("My data");
    console.log(data);
    async function addStadium() {
    //     try {
    //         if (data.numRows <= 0) {
    //         alert("Num of seats per row cannot be less than zero");
    //         return;
    //         }
    //         if (data.numSeats<= 0) {
    //         alert("Num of seats cannot be less than zero");
    //         return;
    //         }
    //         if (data.numRows > data.numSeats) {
    //         alert("Capacity cannot be greater than num of seats per row");
    //       return;
    //       }
    //       if (data.numRows > 20) {
    //         alert("Num of seats per row cannot be greater than 20");
    //         return;
    //       }
    //       if (data.numSeats> 20) {
    //         alert("Num of seats cannot be greater than 20");
    //         return;
    //       }
    //         const request = await axios.post("http://localhost:3001/stadiums/add-stadium", data, 
    //         { headers: { Authorization: `Bearer ${sessionStorage.getItem("tokenValue")}` } }).then((res) => {
    //             console.log(res)
    //         })


    //         window.location.reload(false);
    //     } catch (err) {
    //         console.log("Error");
    //     }

    // }
    addStadium()
    };
  };

    return (
    
    <div className={classes.body}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => onformSubmit(values)}
      >
        {({ values }) => (
          <Form className={classes.shape}>
            <h2 className={classes.titles}>Add Stadium</h2>
            <div className={classes.forminput}>
              <div className={classes.inputbox}>
                <label className={classes.label}>Stadium Name</label>
                <Field
                  className={classes.input}
                  type="text"
                  name="venue"
                  placeholder="Type here"
                />
                <ErrorMessage
                  className={classes.Err}
                  name="venue"
                  component="span"
                />
              </div>
              <div className={classes.inputbox}>
                <label className={classes.label}>Capacity</label>
                <Field
                  className={classes.input}
                  type="number"
                  name="numSeats"
                  placeholder="Type here"
                />
                <ErrorMessage
                  className={classes.Err}
                  name="numSeats"
                  component="span"
                />
              </div>
              <div className={classes.inputbox}>
                <label className={classes.label}>No. Of Seats per row</label>
                <Field
                  className={classes.input}
                  type="number"
                  name="numRows"
                  placeholder="Type here"
                />
                <ErrorMessage
                  className={classes.Err}
                  name="numRows"
                  component="span"
                />
              </div>
            </div>
              <button type="submit" className={classes.buttons} >Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddStadium;