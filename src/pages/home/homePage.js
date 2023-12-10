import React from "react";
import classes from "./home.module.css";
//import MatchCard from "../../generic components/home/matchCard";
import GenericModal from "../../generic components/generic modal/GenericModal";
import championsImg from "../../assets/imgs/home/Champions.png";


const Home = () => {

  return (
    <>
      
      <div className={classes.homePage}>
        {/* Hero Section */}
        <img src={championsImg} alt="Champions" className={classes.mainImg} />
        <img src={championsImg} alt="Champions" className={classes.blurImg} />
        {/* Headline */}
        <div className={classes.body}>
        <h1 className={classes.title}>Experience the thrill of Egyptian Premier League live matches! <br></br> Reserve your tickets now.</h1>
      
      {/* Match Information Section */}
        <h2 className= {classes.title}>Upcoming Matches</h2>
        {/* Display match details and a button to select the match */}
        {/* <MatchCard team1= "Al Ahly"
           team2="Zamalek"
           date="2021-10-10"
           id = "1"
           key= "2"/>  */}
    

      {/* Ticket Reservation Section */}
      <section>
        <h2>Reserve Your Tickets</h2>
        {/* Reservation Form */}
        {/* Pricing Information */}
        <button className={classes.buttons}><p>Reserve Now </p></button>
      </section>

      {/* Stadium Information Section Only VIP section is available for now*/}
      <section>
        <h2>Stadium Information</h2>
        {/* Display stadium details and a button to select the stadium */}
      </section>

      {/* FAQ Section Page*/}
      <section>
        <h2>FAQs</h2>
        {/* Display frequently asked questions and answers */}
      </section>

      {/* Contact Information Page */}
      <section>
        <h2>Contact Us</h2>
        {/* Display contact details or a contact form */}
      </section>

      {/* Footer Section */}
      <footer>
        {/* Links, Social Media Icons, Copyright Information */}
      </footer>
      </div>
      </div>
    </>
  );
};

export default Home;
