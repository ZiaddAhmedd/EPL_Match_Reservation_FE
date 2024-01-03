import React from "react";
import classes from "./home.module.css";
//import MatchCard from "../../generic components/home/matchCard";
import GenericModal from "../../generic components/generic modal/GenericModal";
import championsImg from "../../assets/imgs/home/Champions.png";
import routes from "../../requests/routes";
import axios from "../../requests/axios";
import MatchCard from "../../generic components/match card/MatchCard";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect , useState } from "react";





const Home = () => {
  const [resp, setResp] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    async function getFutureMatches() {
      const resp = await axios.get(
        routes.getFutureMatches
      );
      console.log(resp);
      setResp(resp.data);

      return resp.data;
    }
    getFutureMatches();
  }, []);





  return (
    <>
      
      <div className={classes.homePage}>
          <img src={championsImg} alt="Champions" className={classes.mainImg} />
          <div className={classes.body}>
            <h2 className= {classes.title}>Upcoming Matches!</h2>
            <div className={classes.cards}>
              {resp?.map((item, index) => (
                <NavLink to={"/Reservations/" + item._id}>
                  <MatchCard
                    key={index}
                    team1={item.firstTeam}
                    team2={item.secondTeam}
                    date={item.dateTime?.substring(0, 10)}
                    matchTime={item.dateTime?.substring(11, 16)}
                    stadium={item.stadium}
                  />
                </NavLink>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
