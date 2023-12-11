import React, { useState, useEffect } from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import MyToaster from "../../generic components/toaster/MyToaster";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const SignupPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [cont, setContinue] = useState(false);
  const [myEmail, setMyEmail] = useState();

  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");

  //To make sure user can't access signUp if he is already logged in
  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, []);


  const initialValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    gender: "",
    city: "",
    address: "",
    role: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(2).required("Field required"),
    password: Yup.string().min(8).required("Field required"),
    email: Yup.string()
      .min(3)
      .email("Invalid email address")
      .required(" Email field is required"),
    firstName: Yup.string().min(2).required("Field required"),
    lastName: Yup.string().min(2).required("Field required"),
  });

  const sendData = async (data) => {
    try {
      const request = await axios.post(routes.signUp, data);
      toast.success("Account created successfully, wait for admin approval");
      // clear form

    } catch (error) {
      setErrorMsg("There is an account associated with this username.");
      setErrorLinkMsg("Log in");
      setErrorLink("/login");
    }
  };

  const handleSubmit = (data) => {
    sendData(data);
    setErrorMsg("");
    setErrorLinkMsg("");
    setErrorLink("");
  };

  return (
      <div className={classes.main}>
        <MyToaster />
        <NavLink to="/">
          <ArrowBackIcon className={classes.backArrow} />
        </NavLink>
        <div className={classes.infoSignUp}>
          <div className={classes.form}>
            <div className={classes.header}>
              <h1>Let's Get Started</h1>
              <h2>Create New Account</h2>
            </div>

            {errorMsg ? (
              <ErrorNotification
                mssg={errorMsg}
                linkmsg={errorLinkMsg}
                link={errorLink}
                signUp={true}
              />
            ) : null}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  {setMyEmail(values.email)}
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      name="firstName"
                      autoComplete="off"
                      data-testid="firstNamefield"
                      placeholder="First Name"
                    />
                    <ErrorMessage name="firstName" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      name="lastName"
                      autoComplete="off"
                      data-testid="lastNamefield"
                      placeholder="Last Name"
                    />
                    <ErrorMessage name="lastName" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      id="email"
                      name="email"
                      autoComplete="off"
                      disabled={cont}
                      data-testid="EmailFieldInput"
                      placeholder="Email address"
                    />
                    <ErrorMessage name="email" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      id="username"
                      name="username"
                      autoComplete="off"
                      disabled={cont}
                      data-testid="usernameFieldInput"
                      placeholder="Username"
                    />
                    <ErrorMessage name="username" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                    <div className={classes.fieldContainer}>
                      <Field
                        className={classes.field}
                        name="password"
                        type="password"
                        autoComplete="off"
                        data-testid="Passwordfield"
                        placeholder="Password"
                      />
                    </div>
                    <ErrorMessage name="password" component="span" />
                  </div>
                  <div className={classes.btn}>
                    <button
                      type="submit"
                      className={classes.button}
                      data-testid="CreateBtn"
                    >
                      <p>Create account</p>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <Link to="/login">
              <p className={classes.changeLink}>
                Already have an account? <b>Log in</b>
              </p>
            </Link>
          </div>
        </div>
        <div className={classes.imgSignUp}></div>
      </div>
  );
};

export default SignupPage;
