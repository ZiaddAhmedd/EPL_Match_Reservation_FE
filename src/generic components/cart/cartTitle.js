import React from 'react'
import classes from './cart.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const cartTitle = (props) => {
  return (
    <div className={classes.cartHeader}>
      <ShoppingCartIcon sx={{ fontSize: "3.5rem", color: "#FFFFF" }} />
      <h1 className={classes.cartTitle}>{props.title}</h1>
    </div>
  )
}

export default cartTitle