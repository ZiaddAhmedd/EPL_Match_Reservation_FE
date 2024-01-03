import React, { useEffect, useState } from "react";
import classes from "./ReserveTicketPage.module.css";
import Seat from "./Seat/Seat";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "../../../index.css";
import axios from "../../../requests/axios";
import routes from "../../../requests/routes";
import toast from "react-hot-toast";
import MyToaster from "../../../generic components/toaster/MyToaster";
import { useSelector } from "react-redux";

const ReserveTicketPage = (props) => {
  const user = useSelector((state) => state.user);
    const reserveTicket = async () => {
    try {
        // {
        //     "matchID": "659484c7d1a5acfe4315d4fc",
        //     "seats": ["1","2"]
        // }
        console.log(props.matchId);
        console.log(selectedSeats);
        const data = {
        matchID: props.matchId,
        seats: selectedSeats,
        };
        const resp = await axios.post(routes.reserveTicket, data);
        toast.success("Ticket reserved");
        handleModalClose();
    } catch (err) {
        toast.error(err.response.data.error);
        handleModalClose();
    }
    };

  const [openModal, setOpenModal] = useState(false);
  function handleModalClose() {
    setOpenModal(false);
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "49.5%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0px",
    boxShadow: 24,
    color: "#761c38",
    p: 4,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  };

  const [selectedSeats, setSelectedSeats] = React.useState([]);
  useEffect(() => {}, [selectedSeats]);

  // create array of zeros of size rows*columns
  const Seats = Array.from({ length: props.rows * props.columns }, () => 0);
  // iterate over this array and change values in the indeces that are in props.seats
  props.seats?.forEach((element) => {
    Seats[element - 1] = 1;
  });
  const rows = 4;
  const columns = 5;
  return (
    <div className={classes.fan}>
    <MyToaster />
      <div
        className={classes.SeatsContainer}
        style={{ width: 5 * props.columns + 0.5 * (props.columns - 1) + "rem" }}
      >
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
      {selectedSeats.length > 0 && user.role === "Fan" &&
      <div className={classes.footerSec}>
        <div className={classes.btn}>
          <button
            className={classes.buttons}
            onClick={() => setOpenModal(true)}
          >
            Reserve
          </button>
        </div>
        <Modal open={openModal}>
          <Box sx={style}>
            <h1>Enter Credit Card details</h1>
            <div className={classes.inputbox}>
              <label className={classes.label}>Card Number</label>
              <input
                className={classes.input}
                type="text"
                name="cardNumber"
                placeholder="Type here"
                pattern="[0-9]{16}"
                required
              ></input>
            </div>
            <div className={classes.inputbox}>
              <label className={classes.label}>CVV</label>
              <input
                className={classes.input}
                type="text"
                name="cvv"
                placeholder="Type here"
                pattern="[0-9]{3}"
                required
              ></input>
            </div>
            <button className={classes.buttons} onClick={reserveTicket}>
              Reserve
            </button>
          </Box>
        </Modal>
      </div>}
    </div>
  );
};

export default ReserveTicketPage;
