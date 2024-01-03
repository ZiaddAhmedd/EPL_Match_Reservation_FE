import React from "react";
import { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form, FieldArray } from "formik";
import classes from "./form.module.css";
import * as Yup from "yup";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { Add } from "@mui/icons-material";
import toast, { ToastBar } from "react-hot-toast";
import MyToaster from "../../generic components/toaster/MyToaster";

const AddStadium = (props) => {

    const initialValues = {
    rows: '',
    seatsPerRow: '',
    name: '',
    };

    const validationSchema = Yup.object().shape({
      name: Yup.string().required(),
      rows: Yup.string().min(1).required(),
      seatsPerRow: Yup.string().min(1).required(),
    });

    const onformSubmit = (data) => {
      console.log("My data");
      console.log(data);
  
      async function addstadium() {
        try {
          const res = await axios.post(routes.addStadium, data);
          console.log(res);
          toast.success("Stadium Added Successfully!");
        }
        catch (error) {
          
          toast.error(error.response.data.error);
        }
      }
      
  
      addstadium()
      };

    return (
    
    <div className={classes.body}>
    <MyToaster />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onformSubmit}
      >
          <Form className={classes.shape}>
            <h2 className={classes.titles}>Add Stadium</h2>
            <div className={classes.forminput}>
              <div className={classes.inputbox}>
                <label className={classes.label}>Stadium Name</label>
                <Field
                  className={classes.input}
                  type="text"
                  name="name"
                  placeholder="Type here"
                />
                <ErrorMessage name="name" component="span" />
              </div>
              <div className={classes.inputbox}>
                <label className={classes.label}>Rows</label>
                <Field
                  className={classes.input}
                  type="number"
                  name="rows"
                  placeholder="Type here"
                />
                <ErrorMessage name="rows" component="span" />
              </div>
              <div className={classes.inputbox}>
                <label className={classes.label}>No. Of Seats per row</label>
                <Field
                  className={classes.input}
                  type="number"
                  name="seatsPerRow"
                  placeholder="Type here"
                />
                <ErrorMessage name="seatsPerRow" component="span" />
              </div>
            </div>
              <button type="submit" className={classes.buttons} >Submit</button>
          </Form>
      </Formik>
    </div>
  );
};

export default AddStadium;