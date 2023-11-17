import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ErrorMessage, Field, Form, Formik } from "formik";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import GenericModal from "../../generic components/generic modal/GenericModal";
import Loader from "../../layouts/loader/Loader";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { userActions } from "../../store/userSlice";
import classes from "./auth.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [email, setEmail] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");

  const [showForgetPass, setShowForgetPass] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);


  function handleCredentialResponse(response) {
    console.log(response.credential);
    const token = response.credential;
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    const data = {
      email: decodedToken.email,
      name: decodedToken.name,
      image: decodedToken.picture,
    };
  }
  

  //To make sure user can't access login if he is already logged in
  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(3)
      .email("Please enter a valid email address")
      .required("Please enter a valid email address"),
    password: Yup.string().required("Password is required"),
  });
  const [loader, setLoader] = useState(false);

  const handleSubmit = (data, { setErrors }) => {
    setErrorMsg("");
    setErrorLinkMsg("");
    setErrorLink("");
    setEmail(data.email);

    async function sendData() {
      setLoader(true);
      try {
        const response = await axios.post(routes.logIn, data);
        dispatch(
          userActions.login({
            id: response.data.user._id,
            token: response.data.token,
          })
        );

        const UserResponse = await axios.get(
          routes.getUser + response.data.user._id
        );
        console.log(UserResponse.data);
        dispatch(
          userActions.updateUser({
            email: UserResponse.data.email,
            name: UserResponse.data.name,
            phoneNO: UserResponse.data.phoneNO,
            isAdmin: UserResponse.data.isAdmin,
            cart: UserResponse.data.cart,
          })
        );
        setLoader(false);
        navigate("/");
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("id", response.data.user._id);
      } catch (err) {
        setLoader(false);
        // console.log("X" + err.response.data.error + "x");
        if (err.response.data.error === "Error: Password is incorrect") {
          setErrorMsg("Email or password is incorrect");
          setShowForgetPass(true);
        } else if (
          err.response.data.error === "Error: email is not verified "
        ) {
          setErrorMsg("Email is not verified");
        } else {
          setErrorMsg("There is no account associated with the email.");
          setErrors({
            email: "There is no account associated with the email.",
          });
          setErrorLinkMsg("Create account");
          setErrorLink("/signup");
        }
      }
    }
    sendData();
  };


  const handleForgetPassword = () => {
    setForgetPasswordModal(false);

    async function sendData() {
      try {
        const response = await axios.patch(routes.forgotPassword, {
          email: email,
        });
        console.log(response);
        setForgetPasswordModal(true);
      } catch (err) {
        console.log(err);
      }
    }

    sendData();
  };

  return (
    <div data-testid="LoginComponent">
      <div className={classes.main}>
        <NavLink to="/">
          <ArrowBackIcon className={classes.backArrow} />
        </NavLink>
        <div className={classes.infoLogin}>
          <div className={classes.form}>
            <div className={classes.header}>
              <h1>Welcome Back,</h1>
              <h2>Login To Your Account</h2>
              <div className={classes.buttonTemp}>
                <div id="g_id_onload">
                </div>
                {/* </div> */}
                {/* <button className={classes.optionButton} onClick={signInWithGoogle}>
                  <GoogleIcon style={{ fontSize: "2.2rem" }} />
                  Login with Google
                </button> */}
                {/* <button className={classes.optionButton}>
                  <FacebookRoundedIcon style={{ fontSize: "2.2rem" }} />
                  Login with Facebook
                </button> */}
              </div>
              <div className={classes.or}>
                <hr></hr>
                <p>or</p>
              </div>
            </div>

            {errorMsg ? (
              <ErrorNotification
                mssg={errorMsg}
                linkmsg={errorLinkMsg}
                link={errorLink}
              />
            ) : null}

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form>
                  {setEmail(values.email)}
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      name="email"
                      autoComplete="off"
                      data-testid="LoginFormEmailInput"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      data-testid="emailError"
                    />
                  </div>
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      name="password"
                      type="password"
                      autoComplete="off"
                      data-testid="LoginFormPasswordInput"
                      placeholder="Password"
                    />
                    <ErrorMessage name="password" component="span" />
                  </div>
                  <p
                    className={classes.screenLink}
                    onClick={handleForgetPassword}
                  >
                    Forgot password?
                  </p>
                  <div className={classes.btn}>
                    <button
                      type="submit"
                      className={classes.button}
                      data-testid="LoginFormSubmitButton"
                    >
                      <p>Login</p>
                    </button>
                  </div>
                  <Link to="/signup">
                    <p className={classes.changeLink}>
                      Do not have an account? <b>Register Now</b>{" "}
                    </p>
                  </Link>
                  {loader && <Loader color={"#f900bf"} />}
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={classes.imageLogin}></div>
      </div>
      {forgetPasswordModal && (
        <GenericModal
          header="Check your email to update your password"
          details={"We sent a link to " + `${email}`}
          icon={<TfiEmail className={classes.modalicon} />}
        />
      )}
    </div>
  );
};

export default LoginPage;
