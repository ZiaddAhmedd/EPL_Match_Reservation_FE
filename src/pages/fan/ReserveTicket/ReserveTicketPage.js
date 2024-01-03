import React, { useEffect } from "react";
import classes from "./ReserveTicketPage.module.css";
import Seat from "./Seat/Seat"

const ReserveTicketPage = (props) => {

    
    const [selectedSeats, setSelectedSeats] = React.useState([]);
    useEffect(() => {

    }, [selectedSeats]);    

    // create array of zeros of size rows*columns 
    const Seats = Array.from({length: props.rows*props.columns}, () => 0)
    // iterate over this array and change values in the indeces that are in props.seats
    props.seats?.forEach(element => {
        Seats[element - 1] = 1
    });
    const rows = 4
    const columns = 5
    return (
        <div className={classes.fan}>
            <div className={classes.SeatsContainer} style={{width: (5*props.columns+0.5*(props.columns-1))+'rem'}}>
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