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

const AddStaff = (props) => {

    const initialValues = {
    name: '',
    type: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        type: Yup.string().required(),
    });

    const onformSubmit = (data) => {
    console.log("My data");
    console.log(data);

    async function addstaff() {
      try {
        const res = await axios.post(routes.addStaff, data);
        console.log(res);
        toast.success("Staff Added Successfully!");
      }
      catch (error) {
        toast.error(error.response.data.error);
      }
    }
    

    addstaff()
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
            <h2 className={classes.titles}>Add Staff</h2>
            <div className={classes.forminput}>
              <div className={classes.inputbox}>
                <label className={classes.label}>Staff Name</label>
                <Field
                  className={classes.input}
                  type="text"
                  name="name"
                  placeholder="Type here"
                />
              </div>
              <div className={classes.dropboxes}>
                <label className={classes.label}>Type</label>
                <Field as="select" name="type" className={classes.dropList}>
                    <option value="" disabled hidden>
                    Select Type
                    </option>
                    <option value="referee" className={classes.dropItem}>
                    Referee
                    </option>
                    <option value="linesman" className={classes.dropItem}>
                    Linesman
                    </option>
                </Field>
                </div>
            </div>
              <button type="submit" className={classes.buttons} >Submit</button>
          </Form>
      </Formik>
    </div>
  );
};

export default AddStaff;