import React, { useState, useEffect } from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import validator from "validator";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GenericModal from "../../generic components/generic modal/GenericModal";
import { BiErrorCircle } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import { NavLink } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Loader from "../../layouts/loader/Loader";

/**
 * Component that renders Signup page
 *
 * @component
 * @example
 * return(<SignupPage />)
 */
const SignupPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [cont, setContinue] = useState(false);
  const [loader, setLoader] = useState(false);
  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [myEmail, setMyEmail] = useState();

  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");
  const [agreeformstate, setagreeformstate] = useState(false);

  //To make sure user can't access signUp if he is already logged in
  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, []);

  const initialValues = {
    email: "",
    phoneNO: "",
    name: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Invalid email address")
      .required(" Email field is required"),

    password: Yup.string().min(8).required("Field required"),
  });

  async function sendData(data) {
    setLoader(true);
    try {
      const request = await axios.post(routes.signUp, data);
      setagreeformstate(true);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      setErrorMsg("There is an account associated with the email.");
      setErrorLinkMsg("Log in");
      setErrorLink("/login");
    }
  }

  const handleSubmit = (data) => {
    sendData(data);
    setErrorMsg("");
    setErrorLinkMsg("");
    setErrorLink("");
  };

  return (
    <div>
      <div className={classes.main}>
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
                      name="name"
                      autoComplete="off"
                      data-testid="namefield"
                      placeholder="Full Name"
                    />
                    <ErrorMessage name="name" component="span" />
                  </div>
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      name="phoneNO"
                      type="number"
                      autoComplete="off"
                      data-testid="phoneNOfield"
                      placeholder="Phone number"
                    />
                    <ErrorMessage name="phoneNO" component="span" />
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
                    {true && (
                      <>
                        <GenericModal
                          header="Verification Email has been sent to you"
                          icon={<TfiEmail className={classes.modalicon} />}
                        />
                      </>
                    )}
                  </div>
                  {loader && <Loader color={"#f900bf"} />}
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
    </div>
  );
};

export default SignupPage;
