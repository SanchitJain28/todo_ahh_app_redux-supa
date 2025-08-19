import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../backend/supabaseConfig";

const savedLogin = localStorage.getItem("isLogin") === "true"; 
const savedDetails = localStorage.getItem("loginDetails");

const initialState = {
  isLogin:  savedLogin,
  loginDetails: savedLogin ? JSON.parse(savedDetails) : {},
  isAlert: false,
  AlertMessage: "",
  AlertStyle: "red-600",
};

export const signUp = createAsyncThunk(
  "signup",
  async (details, { rejectWithValue }) => {
    try {
      const response = await supabase.auth.signUp({
        email: details.email,
        password: details.password,
      });
      //THIS PART OF CODE IS NECCASARY
      if (response.error) {
        console.log("FUCKED");
        throw new Error(response.error.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message); // Send the error to the `rejected` case
    }
  }
);

export const logIn = createAsyncThunk(
  "login",
  async (details, { rejectWithValue }) => {
    try {
      let response = await supabase.auth.signInWithPassword({
        email: details.email,
        password: details.password,
      });
      //THIS PART OF CODE IS NECCASARY
      if (response.error) {
        console.log("FUCKED");
        throw new Error(response.error.message);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message); // Send the error to the `rejected` case
    }
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    hideAlert: (state, action) => {
      state.isAlert = false;
    },
    logOut: (state, action) => {
      state.isLogin = false;
      state.loginDetails = [];
      localStorage.removeItem("isLogin");
    },
  },
  //DHANG SE SETUP KRNA HOTA HAI LAUDE
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log("HI! IT WORKED");
      state.isLogin = true;
      state.isAlert = true;
      state.AlertMessage = "successfull registered ! Welcome";
      state.AlertStyle = "green-600";
      state.loginDetails = action.payload.user;
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginDetails", JSON.stringify(action.payload.user));
    });
    builder.addCase(signUp.rejected, (state, action) => {
      console.log("HI! IT FUCKED");
      state.isLogin = false;
      state.isAlert = true;
      state.AlertMessage = action.payload;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.isLogin = true;
      state.isAlert = true;
      state.AlertMessage = "successfull registered ! Welcome";
      state.AlertStyle = "green-600";
      state.loginDetails = action.payload.user;
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("loginDetails", JSON.stringify(action.payload.user));
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.isLogin = false;
      state.isAlert = true;
      state.AlertMessage = action.payload;
    });
  },
});

export const { hideAlert, logOut } = authSlice.actions;

export default authSlice.reducer;
