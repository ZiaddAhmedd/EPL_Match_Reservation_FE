import React, { useState , useEffect} from "react";
import classes from "./NotFound.module.css";
import nf1 from "../../assets/imgs/notFound/nf1.png"
import nf3 from "../../assets/imgs/notFound/nf3.png"
import { useNavigate } from "react-router-dom";

function NotFound()
{
    const navigate = useNavigate();
    function handleButton ()
    {
        navigate("/");
    }

return(

<div className={classes.container}>
    <div className={classes.imgCont1}>
        <div className={classes.img1cont}>
            <img src={nf3} alt="Not found 1" className={classes.img1}></img>
        </div>
        <div className={classes.btnCont}>
            <button className={classes.btn} onClick={handleButton}>Back to home</button>
        </div>
    </div>
    <div className={classes.imgCont2}>
       <img src={nf1} alt="Not found 2" className={classes.img2}></img>
    </div>
</div>

);
};
export default NotFound;