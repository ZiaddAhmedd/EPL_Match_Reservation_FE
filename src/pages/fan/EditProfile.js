import React, { useEffect, useState } from 'react'
import classes from './EditProfile.module.css'
import axios from "../../requests/axios";
import "../../index.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../requests/routes';
import { userActions } from "../../store/userSlice";
import toast from "react-hot-toast";
import MyToaster from "../../generic components/toaster/MyToaster";

const EditProfile = (props) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const initialValues = {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: formatDate(user.birthDate),
        address: user.address,
        city: user.city,
    };
    function formatDate(dateString) {
        if (dateString != null && dateString != "") {
            return dateString.substring(0, 10);
        } else {
            return "";
        }
    }
    initialValues.birthDate = formatDate(initialValues.birthDate);

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(2).required(),
        lastName: Yup.string().min(2).required(),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password field is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match"),

    });

    const handleSubmit = (data, { setErrors }) => {
        console.log("hee");

        async function sendData() {
            try {
                const response = await axios.put(routes.updateUser, data);
                toast.success("User Data Updated Successfully!");
                dispatch(
                    userActions.updateUser({
                        username: response.data.username,
                        email: response.data.email,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        address: response.data.address,
                        gender: response.data.gender,
                        role: response.data.role,
                        birthDate: formatDate(response.data.birthDate),
                        city: response.data.city
                    })
                );

            } catch (err) {
            }
        }
        sendData();

    };

    const egyptCities = ["Alexandria","Aswan","Asyut","Beheira","Beni Suef","Cairo","Dakahlia","Damietta","Faiyum","Gharbia","Giza","Ismailia","Kafr El Sheikh","Luxor","Matruh","Minya","Monufia","New Valley","North Sinai","Port Said","Qalyubia","Qena","Red Sea","Sharqia","Sohag","South Sinai","Suez"]
    return (
        <div className={classes.EditProfile}>
            <MyToaster />
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {() => (
                    <Form className={classes.Form}>
                        <div className={classes.boxContainer}>
                            <label className={classes.label}>Username</label>
                            <Field
                                className="inputField inputFieldDisabled"
                                name="username"
                                autoComplete="off"
                                type="text"
                                disabled
                            />
                        </div>
                        <div className={classes.boxContainer}>
                            <label className={classes.label}>E-mail</label>
                            <Field
                                className="inputField inputFieldDisabled"
                                name="email"
                                autoComplete="off"
                                type="email"
                                placeholder="Email"
                                disabled
                            />
                        </div>

                        <div className={classes.nameContainer}>
                            <div className={classes.name}>
                                <label className={classes.label}>First Name</label>
                                <Field
                                    className="inputField"
                                    name="firstName"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="First Name"
                                />
                            <ErrorMessage name="firstName" component="span" />
                            </div>
                            <div className={classes.name}>
                                <label className={classes.label}>Last Name</label>
                                <Field
                                    className="inputField"
                                    name="lastName"
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Last Name"
                                />
                            <ErrorMessage name="lastName" component="span" />
                            </div>
                        </div>
                        <div className={classes.nameContainer}>
                            <div className={classes.name}>
                                <label className={classes.label}>New Password</label>
                                <Field
                                    className="inputField"
                                    name="password"
                                    type="password"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="password" component="span" />
                            </div>
                            <div className={classes.name}>
                                <label className={classes.label}>Confirm New Password</label>
                                <Field
                                    className="inputField"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="off"
                                />
                                <ErrorMessage name="confirmPassword" component="span" />
                            </div>
                        </div>

                        <div className={classes.dropboxes}>
                            <div className={classes.dropbox}>
                                <label className={classes.label}>Gender</label>
                                <Field as="select" name="gender" className={classes.dropList}>
                                    <option value="Male" className={classes.dropItem}>
                                        Male
                                    </option>
                                    <option value="Female" className={classes.dropItem}>
                                        Female
                                    </option>
                                </Field>
                            </div>
                        </div>

                        <div className={classes.dropboxes}>
                            <div className={classes.dropbox}>
                                <label className={classes.label}>City</label>
                                <Field as="select" name="city" className={`${classes.dropList} ${classes.scrollableList}`}>
                                    <option value="" disabled hidden className={classes.dropItem}>
                                    Select a city
                                    </option>
                                    {egyptCities.map((city, index) => (
                                    <option key={index} value={city} className={classes.dropItem}>
                                        {city}
                                    </option>
                                    ))}
                                </Field>
                            </div>
                        </div>

                        <div className={classes.boxContainer}>
                            <label className={classes.label}>Full Address</label>
                            <Field
                                className="inputField"
                                name="address"
                                autoComplete="off"
                                placeholder="Full Address"
                            />
                        </div>

                        

                        <div className={classes.boxContainer}>
                            <label className={classes.label}>Birth Date</label>
                            <Field
                                className="inputField"
                                name="birthDate"
                                type="date"
                            />
                        </div>

                        <button type="submit" className={classes.saveBtn}>
                            <p>Update</p>
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default EditProfile