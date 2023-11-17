import React, { useEffect } from "react";
import classes from "./cart.module.css";
import CartCard from "./cartCard";
import { useSelector } from "react-redux";



// includeCheckout = true in case of cart component
const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    console.log(props.items);
  }, []);


  return (
    <div className={classes.cartContainer}>
      <div className={classes.cartItems}>
        {props.items.map((card) => (
          <CartCard
            id={card._id}
            key={card._id+card.size}
            img={card.images[0]}
            title={card.title}
            price={card.price}
            size={card.size}
            quantity={card.quantity}
            includeCheckout={props.includeCheckout}
          />
        ))}
      </div>

      {props.includeCheckout ? (
        <div className={classes.checkOut}>
          <div className={classes.totalCheck}>
            <div className={classes.totalCheckInfo}>
              <h5>Total Order</h5>
              <h6>Inclusive of VAT</h6>
            </div>
            <h4>{cart.cartTotalPrice} EGP</h4>
          </div>
          <button>
            <p>Proceed to Checkout</p>
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
