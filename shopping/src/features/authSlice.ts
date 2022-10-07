import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";

const initialState: any = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser: any = createAsyncThunk(
  "auth/registerUser",
  async (values: any, { rejectWithValue }) => {
    try {
      const token = await axios.post("http://localhost:5000/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser: any = createAsyncThunk(
  "auth/loginUser", 
  async (values: any, {rejectWithValue}) => {
    try {
      const token = await axios.post("http://localhost:5000/login", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user: any = jwtDecode(token);

        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      return { ...state, registerStatus: "pending" };
    },
    [registerUser.fulfilled]: (state, action) => {
      if (action.payload) {
        const user: any = jwtDecode(action.payload);

        return {
          ...state,
          token: action.payload.token,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "Success",
        };
      } else return state;
    },
    [registerUser.rejected]: (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    },

    // login
    [loginUser.pending]: (state, action) => {
      return { ...state, registerStatus: "pending" };
    },
    [loginUser.fulfilled]: (state, action) => {
      if (action.payload) {
        const user: any = jwtDecode(action.payload);

        return {
          ...state,
          token: action.payload.token,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "Success",
        };
      } else return state;
    },
    [loginUser.rejected]: (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    },
  },
});
export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
