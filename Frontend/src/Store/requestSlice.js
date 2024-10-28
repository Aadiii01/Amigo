import { BACKEND_URL } from "@/Utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser } from "./userSlice";
import axios from "axios";

export const fetchRequest = createAsyncThunk(
  "fetchRequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BACKEND_URL + "/connection/request/received",
        { withCredentials: true }
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const reviewRequest = createAsyncThunk(
  "reviewRequest",
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/connection/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      return { requestId, status, data: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const requestSlice = createSlice({
  name: "requestData",
  initialState: {
    request: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.request = action.payload.data;
      })
      .addCase(fetchRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(reviewRequest.fulfilled, (state, action) => {
        const { requestId } = action.payload;
        state.request = state.request.filter((req) => req._id !== requestId);
      });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.request = [];
    });
  },
});

export default requestSlice.reducer;
