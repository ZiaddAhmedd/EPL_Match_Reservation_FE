import PersonIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingIcon from "@mui/icons-material/ShoppingBagOutlined";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Cart from "../../generic components/cart/cart";
import CartTitle from "../../generic components/cart/cartTitle";
import Overlay from "../../generic components/overlay/Overlay.tsx";
import classes from "./navbar.module.css";
import { userActions } from "../../store/userSlice.js";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logged = user.loggedIn;
  const [showCart, setShowChart] = useState(false);

  const logoutHandler = () => {
    dispatch(userActions.logout());
    navigate("/login");
  };

  return (
    <nav className={classes.nav}>
      <div className={classes.left}>
        <SearchIcon fontSize="large" /> <input placeholder="Search" />
      </div>
      <NavLink to="/" className={classes.brand}>
        <h1> EPL </h1>
      </NavLink>
      <div className={classes.icons}>
        {logged ? (
          <NavLink to="/login" onClick={logoutHandler}>
            <p>Logout</p>
          </NavLink>
        ) : null}
        <div className={classes.profile}>
          {!logged ? (
            <NavLink to="/login">
              <p>Login</p>
            </NavLink>
          ) : (
            user.role !== "Admin" &&
            <NavLink to={"/Fan/"+user.id+"/EditProfile"}>
              <PersonIcon fontSize="large" />
            </NavLink>
          )}
        </div>
        <div className={classes.cartIcon}>
          <ShoppingIcon fontSize="large" onClick={() => setShowChart(true)} />
          {cart.cartQuantity > 0 && (
            <h6 className={classes.cartItemsNumber}>{cart.cartQuantity}</h6>
          )}
        </div>
      </div>

      <Overlay
        header={<CartTitle title={"My Cart"} />}
        open={showCart}
        onClose={() => setShowChart(false)}
        position="right"
      >
        <Cart includeCheckout={true} items={cart.items} />
      </Overlay>
    </nav>
  );
};

export default NavBar;
