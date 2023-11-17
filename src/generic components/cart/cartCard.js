import React, { useState } from "react";
import classes from "./cartCard.module.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

const CartCard = (props) => {
  const dispatch = useDispatch();
  const [currentQuantity, setCurrentQuantity] = useState(props.quantity);
  const increaseQuantityHandler = () => {
    setCurrentQuantity(currentQuantity + 1)
  }
  const decreaseQuantityHandler = () => {
    setCurrentQuantity(currentQuantity - 1)
  }
  return (
    <div className={classes.cartContainer}>
      <div className={classes.imageContainer}>
        <img src={props.img} alt="Product" />
      </div>
      <div className={classes.infoContainer}>
        <h2>{props.title}</h2>
        <h2>{props.price}</h2>
        <h3 className={classes.moreInfo}> Size: {props.size}</h3>
        <h3> Color: Red</h3>
      </div>
      <div className={classes.quantity}>
        {props.includeCheckout ? (
          <DeleteForeverIcon
            style={{ fontSize: "2.2rem" }}
            className={classes.deleteIcon}
            onClick={() => dispatch(cartActions.deleteItem({id:props.id+props.size, quantity:props.quantity, price:props.price}))}
          />
        ) : null}
        <h4>Quantity</h4>
        <div className={classes.quantityCounter}>
          <div className={classes.quantityInput}>{currentQuantity}</div>
          {props.includeCheckout ? (
            <div className={classes.arrows}>
              <span onClick={increaseQuantityHandler}>
                <KeyboardArrowUpIcon className={classes.arrowUp} />
              </span>
              <span
                onClick={() =>
                  currentQuantity > 1
                    ? decreaseQuantityHandler()
                    : null
                }
              >
                <KeyboardArrowDownIcon
                  className={
                    currentQuantity > 1
                      ? classes.arrowDown
                      : classes.disabledArrow
                  }
                />
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
