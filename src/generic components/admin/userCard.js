import React, { useEffect } from "react";
import classes from "./userCard.module.css";
import toast, { ToastBar } from "react-hot-toast";
import axios from "../../requests/axios";
import routes from "../../requests/routes";
import MyToaster from "../../generic components/toaster/MyToaster";
import { useState } from "react";


const UserCard = (props) => {



    const approveUser = async () => {
        try {
        const resp = await axios.post(routes.verifyUser + props.id);
        toast.success("User Verified Successfully");
        window.location.reload();
        } catch (err) {
        toast.error("Something went wrong");
        }
    };


  const removeUser = async () => {
    try {
    const resp = await axios.delete(routes.deleteUser + props.id);
    toast.success("User Removed Successfully");
    window.location.reload();
    } catch (err) {
    toast.error("Something went wrong");
    }
   
};

return (
    <div className={classes.body}>
        <div className={classes.sub1}>
            <div className={classes.name} >{props.username}</div>
            <div >{props.email}</div>
            <div >{props.role}</div>
        </div>
        <div className={classes.sub2}>
        {!props.verified ?
        <button onClick={approveUser} className={classes.buttons}>
                Verify
        </button>
        :
        null
        }
        <button onClick={removeUser} className={classes.buttons}>
            Remove
        </button>
        </div>
    </div>
);
};

export default UserCard;