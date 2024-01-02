import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TfiEmail } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import GenericModal from "../../generic components/generic modal/GenericModal";
import MyToaster from "../../generic components/toaster/MyToaster";
import Loader from "../../layouts/loader/Loader";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import { userActions } from "../../store/userSlice";
import classes from "./auth.module.css";
import EPLIcon from "../../assets/imgs/login/EPL_Icon.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [errorLink, setErrorLink] = useState("");
  const [errorLinkMsg, setErrorLinkMsg] = useState("");

  const [showForgetPass, setShowForgetPass] = useState(false);
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false);

  //To make sure user can't access login if he is already logged in
  useEffect(() => {
    if (user.loggedIn) {
      navigate("/");
    }
  }, []);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(2)
      .required("Please enter a username"),
    password: Yup.string().required("Password is required"),
  });
  const [loader, setLoader] = useState(false);

  const handleSubmit = (data, { setErrors }) => {
    setErrorMsg("");
    setErrorLinkMsg("");
    setErrorLink("");
    setUsername(data.username);

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

        dispatch(
          userActions.updateUser({
            username: UserResponse.data.username,
            email: UserResponse.data.email,
            firstName: UserResponse.data.firstName,
            lastName: UserResponse.data.lastName,
            address: UserResponse.data.address,
            gender: UserResponse.data.gender,
            role: UserResponse.data.role,
            birthDate: UserResponse.data.birthDate,
          })
        );
        setLoader(false);
        if (UserResponse.data.role === "Admin") {
          navigate("/admin");
        } else if (UserResponse.data.role === "Manager") {
          navigate("/manager");
        } else if (UserResponse.data.role === "Fan") {
          navigate("/fan");
        } else {
          navigate("/");
        }
        // sessionStorage.setItem("token", response.data.token);
        // sessionStorage.setItem("id", response.data.user._id);
        // sessionStorage.setItem("username", response.data.user.username);
      } catch (err) {
        setLoader(false);
        if (err.response.data.error === "Error: Password is incorrect") {
          setErrorMsg("Username or password is incorrect");
          setShowForgetPass(true);
        } else if (
          err.response.data.error === "Error: username is not verified "
        ) {
          setErrorMsg("Username is not verified");
        } else {
          setErrorMsg("There is no account associated with this username.");
          setErrors({
            username: "There is no account associated with this username.",
          });
          setErrorLinkMsg("Create account");
          setErrorLink("/signup");
        }
      }
    }
    sendData();
  };


  const handleForgetPassword = () => {
    async function sendData() {
      try {
        const response = await axios.patch(routes.forgotPassword, {
          username: username,
        });
        toast.success("Forget password link sent successfully");
      } catch (err) {
        if (err.response.data.error === "Error: email is not verified ") {
          toast.error("Email is not verified");
        } else {
          toast.error("Error occurred");
        }
      }
    }

    sendData()
  };

  return (
    <div data-testid="LoginComponent">
      <MyToaster />
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
                <div id="g_id_onload"></div>
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
                  {setUsername(values.username)}
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      name="username"
                      autoComplete="off"
                      placeholder="Username"
                    />
                    <ErrorMessage
                      name="username"
                      component="span"
                    />
                  </div>
                  <div className={classes.boxContainer}>
                    <Field
                      className={classes.field}
                      name="password"
                      type="password"
                      autoComplete="off"
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
                    >
                      <p>Login</p>
                    </button>
                  </div>
                  <Link to="/signup">
                    <p className={classes.changeLink}>
                      Do not have an account? <b>Register Now</b>{" "}
                    </p>
                  </Link>
                  {loader && <Loader color= {"#BB5824"} />}
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={classes.imageLogin}>
          <img src={EPLIcon} alt="EPL Icon" className={classes.img} />
        </div>
      </div>
      {/* {forgetPasswordModal && (
        <GenericModal
          header="Check your email to update your password"
          details={"We sent a link to " + `${username}`}
          icon={<TfiEmail className={classes.modalicon} />}
        />
      )} */}
    </div>
  );
};

export default LoginPage;
