import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const res = axiosInstance.post("user/register", data);

    toast.promise(res, {
      loading: "Wait! Creating your Account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create Your Account",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.res?.data?.message);
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const res = axiosInstance.post("user/login", data);
    console.log(res);
    toast.promise(res, {
      loading: "Wait! Authenticaion in Progress",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Login",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = axiosInstance.get("user/logout");
    toast.promise(res, {
      loading: "Logging Out",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Logout",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem("data", JSON.stringify(action?.payload?.user));
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        state.isLoggedIn = true;
        state.data = action?.payload?.user;
        state.role = action?.payload?.user?.role;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.data = {};
        state.isLoggedIn = false;
        state.role = "";
      });
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
