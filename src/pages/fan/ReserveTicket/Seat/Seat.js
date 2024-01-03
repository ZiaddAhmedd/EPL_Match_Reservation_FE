import React from "react";
import classes from "./Seat.module.css";

const Seat = (props) => {
    const [userSelected, setUserSelected] = React.useState(false);
    const handleClick = () => {
        if (props.selected) {
            return;
        }
        setUserSelected(!userSelected);
        if (userSelected) {
            props.setSeats(props.selectedSeats.filter((seat) => seat !== (props.index + 1)));
            return;
        }
        props.setSeats([...props.selectedSeats, props.index + 1]);
    };
    return (
        <div className={classes.seat}>
            <div
                className={classes.container}
                onClick={handleClick}
                style={props.selected ? { backgroundColor: "#FF0000" } : (userSelected ? { backgroundColor: "#D7FF7B" } : { backgroundColor: "white" })}>
                <p>{props.index+1}</p>
            </div>
        </div>
    )
};

export default Seat;
