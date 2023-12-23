import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import classes from "./footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <p >© EPL — 2023. All rights reserved. </p>
        <div className={classes.socialIcons}>
          <a href="https:/www.facebook.com/EPL.EG" target="_blank">
            <FaFacebook className={classes.icon} />
          </a>
          <a href="https:/twitter.com/epl_eg" target="_blank">
            <FaTwitter className={classes.icon} />
          </a>
          <a href="https:/www.instagram.com/epl.eg" target="_blank">
            <FaInstagram className={classes.icon} />
          </a>
        </div>
        <div  className={classes.contactus}>
          <a href="https://www.facebook.com/messages/t/104657012005760"  target="_blank">
            <p>Contact Us</p>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
