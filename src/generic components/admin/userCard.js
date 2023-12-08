import React, { useEffect } from "react";
import classes from "./userCard.module.css";
import axios from 'axios'


const UserCard = (props) => {
  const approveUser = () => {
    // (async () => {
    //   var config = {
    //       method: 'put',
    //       headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
    //     };
    //   let response = '';
    //   try {
    //       console.log(props.email)


    //       response = await axios.put("http://localhost:3001/auth/sign-up-approve/" + props.id, '',{ headers: { Authorization: `Bearer ${sessionStorage.getItem("tokenValue")}` } }).then((res) => {
    //           console.log(res)
    //       })
    //       return (response);
    //     } catch (error) {
    //       if (error.response) {
    //         return (error.response);
    //       }
    //     }
    //     return (response);

    // })();
  };

  const removeUser = () => {
    // (async () => {
    //   var config = {
    //       method: 'delete',
    //       headers: {Authorization:"Bearer "+ sessionStorage.getItem("tokenValue") }
    //     };
    //   let response = '';
    //   try {

    //       response = await axios.delete("http://localhost:3001/auth/sign-up-disapprove/" + props.id ,config).then((res) => res.data);

    //       return (response);
    //     } catch (error) { 
    //       if (error.response) {
    //         return (error.response);
    //       }
    //     }
    //     return (response);

    // })();
};

return (
    <div className={classes.body}>
        <div className={classes.sub1}>
            <div className={classes.name} >{props.username}</div>
            <div >{props.email}</div>
            <div >{props.id}</div>
        </div>
        <div className={classes.sub2}>
        <button onClick={approveUser} className={classes.buttons}>
                Verify
        </button>
        <button onClick={removeUser} className={classes.buttons}>
            Remove
        </button>
        </div>
    </div>
);
};

export default UserCard;