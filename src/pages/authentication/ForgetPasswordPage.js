import React, { useEffect, useState } from "react";
import classes from "./auth.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../requests/axios"
import routes from "../../requests/routes"
import { useNavigate,useParams } from "react-router-dom";
// import { useDispatch } from 'react-redux'
import ErrorNotification from "../../generic components/error message/ErrorNotification";
import { useSelector } from "react-redux";
import GenericModal from "../../generic components/generic modal/GenericModal";
import {GiConfirmed} from "react-icons/gi";
import Loader from "../../layouts/loader/Loader";


/**
 * Component that renders forget password page
 * 
 * @component
 * @example
 * return(<ForgetPasswordPage />)
*/

const ForgetPasswordPage = ({onSubmit}) => {
  
  const navigate = useNavigate();
//   const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [randImg, setrandImg] = useState(Math.floor(Math.random() * 3));
  const [errorMsg, setErrorMsg] = useState('');
  const [errorLink, setErrorLink] = useState('');
  const [errorLinkMsg, setErrorLinkMsg] = useState('');
  const[confirmform,setconfirmform]=useState(false);
  const[loader,setLoader]=useState(false);

  
  //To make sure user can't access login if he is already logged in 
  useEffect(() => {
    if(user.loggedIn){
      navigate("/")
    }
  }, []);
  
  const initialValues = {
   
    password: ""
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8).required("Password is required"),
  });

  /**
 * Submits the new password data to the server
 * @namespace onSubmit
 * @param   {string} password   User password
 */
  const loginhandle=()=>{
    navigate('/login');
  }
  const {id}= useParams();
  const handleSubmit = (data) => {
    setLoader(true);
    setconfirmform(false);
    async function sendData(){
        try{
            const instance  = axios.create({
                baseURL: "https://have-a-dream.onrender.com/",
                headers: {
                    Authorization: "Bearer "+ id,
                    ID: sessionStorage.getItem("ID")
                }
            })
            const response = await instance.patch(routes.changePassword, data)
            setconfirmform(true)
            setLoader(false)
            
            
        } catch(err){
            setLoader(false)
        }
    }
    sendData()
};
    // onSubmit(data);
    return (
        <div data-testid="ForgetPassComponent">
            <div className={classes.main}>
                <div className={classes.infoLogin} >
                    <div className={classes.form}>
                        <div className={classes.header} >
                            <h1>Update your Password</h1>
                        </div>
                        {errorMsg?
                        <ErrorNotification mssg={errorMsg} linkmsg={errorLinkMsg} link={errorLink}/>:null}

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>

                            {({ values }) => (
                            <Form>
                                <div className={classes.boxContainer}>
                                    <div className={classes.fieldContainer}>
                                            <Field
                                                className={classes.field}
                                                name="password"
                                                type="password"
                                                autoComplete="off"
                                                data-testid="ForgetPasswordFormPasswordInput"
                                                placeholder="New Password"
                                            />
                                    </div>
                                    <ErrorMessage name="password" component="span" />
                                </div>
                                <div className={classes.btn}>
                                    <button type="submit" className={classes.button} data-testid="ForgetPasswordFormSubmitButton">
                                        Update password
                                    </button>
                                </div>
                                { confirmform&&(
                                <GenericModal 
                                    header='Password reset successfully'
                                    confirmbtn='Login'
                                    icon={<GiConfirmed className={classes.modalicon}/>}
                                    accepthandle={loginhandle}
                                />
                                )}
                                {loader && <Loader color={"#F46444"}/>}
                            </Form>)}
                        </Formik>
                    </div>
                </div>
                <div className={classes.imageLogin}></div>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;

