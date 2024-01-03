import React, { useEffect } from "react";
import classes from "./ReserveTicketPage.module.css";
import Seat from "./Seat/Seat"
import MatchCard from "../../../generic components/home/MatchCard";

const ReserveTicketPage = () => {
    const [selectedSeats, setSelectedSeats] = React.useState([]);
    useEffect(() => {

    }, [selectedSeats]);    

    const Seats = [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0]
    const rows = 4
    const columns = 5
    return (
        <div className={classes.fan}>
            <MatchCard 
                team1="Egypt"
                team2="Brazil"
                date="2021-08-01"
            />
            <div className={classes.SeatsContainer} style={{width: (5*columns+0.5*(columns-1))+'rem'}}>
                {Seats.map((size, index) => (
                    <Seat
                        key={index}
                        index={index}
                        setSeats={setSelectedSeats}
                        selectedSeats={selectedSeats}
                        selected={Seats[index]}
                    />
                ))}
            </div>
        </div>
    )
};

export default ReserveTicketPage;