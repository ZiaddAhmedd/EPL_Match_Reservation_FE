import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import Cities from "../../assets/data/Cities";
import Governorate from "../../assets/data/Governorate";
import "../../index.css";
import classes from "./informationForm.module.css";

const InformationForm = (props) => {
  const user = useSelector((state) => state.user);
  const [govID, setGovId] = useState("1");
  const initialValues = {
    email: user.email,
    name: user.name,
    phoneNo: user.phoneNO,
    address: "",
    specialNotes: "",
    cities: "",
    governorateID: "1",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
  });

  function handleSubmit(data, { setErrors }) {
    props.next();
    console.log(data);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>{props.title}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            {setGovId(values.governorateID)}
            <div className={classes.boxContainer}>
              <Field
                className="inputField"
                name="name"
                autoComplete="off"
                placeholder="Name"
              />
            </div>
            <div className={classes.boxContainer}>
              <Field
                className="inputField"
                name="phoneNo"
                type="text"
                autoComplete="off"
                placeholder="Phone number"
              />
              <ErrorMessage name="phoneNo" component="span" />
            </div>
            <div className={classes.boxContainer}>
              <Field
                className="inputField"
                name="email"
                autoComplete="off"
                type="email"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="span"
                data-testid="emailError"
              />
            </div>
            <div className={classes.dropboxes}>
              <div className={classes.dropbox}>
                <Field as="select" name="governorateID" className={classes.dropList}>
                  {Governorate.map((governorate) => {
                    return (
                      <option value={governorate.id} className={classes.dropItem}>
                        {governorate.governorate_name_en}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <div className={classes.dropbox}>
                <div className={classes.selector}>
                  <Field as="select" name="cities" className={classes.dropList}>
                    {Cities.filter((City) => City.governorate_id === govID).map((city) => {
                      return (
                        <option value={city.city_name_en} className={classes.dropItem}>
                          {city.city_name_en}
                        </option>
                      );
                    })}
                  </Field>
                </div>
              </div>
            </div>
            <div className={classes.boxContainer}>
              <Field
                className="inputField"
                name="address"
                autoComplete="off"
                placeholder="Full Address"
              />
            </div>
            {props.inCheckOut && (
              <div className={classes.boxContainer}>
                <Field
                  className="inputField"
                  name="specialNotes"
                  autoComplete="off"
                  placeholder="Special Notes (optional)"
                />
              </div>
            )}
            <button type="submit" className={classes.saveBtn}>
              <p>{props.textBtn}</p>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InformationForm;
