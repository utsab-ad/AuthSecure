// src/redux/clientSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginClient = createAsyncThunk(
  "client/loginClient",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login/client`,
        { email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Client login failed"
      );
    }
  }
);


export const registerClient = createAsyncThunk(
  "client/registerClient",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register/client`,
        { name, email, password },
        { withCredentials: true }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Client registration failed"
      );
    }
  }
);

const clientSlice = createSlice({
  name: "client",
  initialState: {
    isClient: false,
    error: null,
    loading: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginClient.fulfilled, (state, action) => {
        state.loading = false;
        state.isClient = true;
        state.message = action.payload.message;
      })
      .addCase(loginClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isClient = false;
      })
      .addCase(registerClient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerClient.fulfilled, (state, action) => {
        state.loading = false;
        state.isClient = true;
        state.message = action.payload.message;
      })
      .addCase(registerClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isClient = false;
      });
  },
});

export default clientSlice.reducer;
