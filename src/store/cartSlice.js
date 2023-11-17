import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        cartQuantity: 0,
        cartTotalPrice: 0
    },
    reducers : {
        addItem (state, action){
            const newItem = action.payload 
            const existingItem = state.items.find((item)=> item._id === newItem.product._id && item.size === newItem.size)
            if(!existingItem){
                state.items.push({
                    _id : newItem.product._id,
                    name: newItem.product.name,
                    category: newItem.product.category,
                    price: newItem.product.price,
                    images : newItem.product.images,
                    quantity: newItem.quantity,
                    size: newItem.size,
                    type: newItem.type
                })
                state.cartQuantity= state.cartQuantity + newItem.quantity;
                state.cartTotalPrice = state.cartTotalPrice + newItem.product.price*newItem.quantity;
            }
        },
        deleteItem(state,action){
            const id = action.payload.id; 
            state.items = state.items.filter((item)=> item._id+item.size !== id)
            state.cartQuantity = state.cartQuantity - action.payload.quantity;
            state.cartTotalPrice = state.cartTotalPrice - action.payload.price*action.payload.quantity;
        },
        increaseQuantity(state,action){
            const id = action.payload._id;
            const existingItem = state.items.find((item)=> item._id === id)
            existingItem.quantity++;
            existingItem.totalPrice = existingItem.price*existingItem.quantity;
        },
        decreaseQuantity(state,action){
            const id = action.payload.id;
            const existingItem = state.items.find((item)=> item._id === id)
            existingItem.quantity--;
            existingItem.totalPrice = existingItem.price*existingItem.quantity;
        },
        clearCart(state){
            state.items = [];
            state.cartQuantity = 0;
            state.cartTotalPrice= 0;
        }
    }
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer;