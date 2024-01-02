import React, { useEffect } from "react";
import classes from "./FanPage.module.css";
//import MatchCard from "../../generic components/home/matchCard";
import GenericModal from "../../generic components/generic modal/GenericModal";
import Seat from "./ReserveTicket/Seat/Seat";


const FanPage = () => {
    const [selectedSeats, setSelectedSeats] = React.useState([]);
    useEffect(() => {

    }, [selectedSeats]);

    const Seats = [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0]
    const rows = 4
    const columns = 5
    return (
        <div className={classes.fan}>
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

export default FanPage;