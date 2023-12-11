import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    id: "",
    token: "",
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    address: "",
    gender: "",
  },
  reducers: {
    login: (state, action) => {
      state.loggedIn = true;
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.username = action.payload.username;
      sessionStorage.clear();
      sessionStorage.setItem("id", action.payload.id);
      sessionStorage.setItem("username", action.payload.username);
      sessionStorage.setItem("token", action.payload.token);
    },
    updateUser: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.address = action.payload.address;
      state.gender = action.payload.gender;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.birthDate = action.payload.birthDate;
    },
    updateUserForm: (state, action) => {
      state.address = action.payload.address;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.birthDate = action.payload.birthDate;
      state.gender = action.payload.gender;
    },
    signup: (state) => {
      state.loggedIn = false;
      state.id = "";
    },

    logout: (state) => {
      state.loggedIn = false;
      state.id = "";
      state.token = "";
      state.username = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.role = "";
      state.address = "";
      state.gender = "";
      localStorage.clear();
      sessionStorage.clear();
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
