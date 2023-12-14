import React, { useEffect, useState } from 'react'
import classes from './fanPage.module.css'
import axios from "../../requests/axios";
import "../../index.css";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import routes from '../../requests/routes';
import { userActions } from "../../store/userSlice";
import toast from "react-hot-toast";
import MyToaster from "../../generic components/toaster/MyToaster";

const FanPage = (props) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const initialValues = {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: formatDate(user.birthDate),
        address: user.address,
        gender: user.gender,
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
        email: Yup.string(),
        // .min(3)
        // .email("Please enter a valid email address")
        // .required("Please enter a valid email address")

        //validate that value from password equals value from confirmPassword
        password: Yup.string(),
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
                    })
                );

            } catch (err) {
            }
        }
        sendData();

    };


    return (
        <div className={classes.fanPage}>
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

export default FanPage