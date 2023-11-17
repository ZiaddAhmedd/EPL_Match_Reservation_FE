import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loggedIn: false,
        id: "",
        token: "",
        email: "",
        name: "",
        phoneNO: "",
        isAdmin:"",
        cart:[],
        facebookID: "",
    },
    reducers: {
        login: (state, action)=>{
            state.loggedIn = true
            state.id = action.payload.id
            state.token = action.payload.token
        },
        updateUser: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.phoneNO = "0"+action.payload.phoneNO;
            state.isAdmin = action.payload.isAdmin;
            state.cart = action.payload.cart;
            state.facebookID = action.payload.facebookID;
            window.location.reload();
        },
        signup: (state) =>{
            state.loggedIn= false
            state.id = ""
        },
        logout: (state) =>{
            state.loggedIn= false
            state.id= ""
            state.token= ""
            state.email= ""
            state.fullName= ""
            state.phoneNO= ""
            state.userType= ""
            localStorage.clear()
            sessionStorage.clear()
        }
    }   
})

export const userActions = userSlice.actions;
export default userSlice.reducer;