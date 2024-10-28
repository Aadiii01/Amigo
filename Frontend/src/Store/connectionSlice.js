import { BACKEND_URL } from "@/Utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser } from "./userSlice";
import axios from "axios";

export const fetchConnection = createAsyncThunk(
  "fetchConnection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BACKEND_URL + "/connection/request/myConnection",
        { withCredentials: true }
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unfriendConnection = createAsyncThunk(
  "unfriendConnection ",
  async (connectionId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        BACKEND_URL + `/connection/request/unfriend/${connectionId}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const connectionSlice = createSlice({
  name: "connectionData",
  initialState: {
    connections: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchConnection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.connections = action.payload;
      })
      .addCase(fetchConnection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(unfriendConnection.fulfilled, (state, action) => {
        if (state.connections) {
          state.connections.data = state.connections.data.filter(
            (connection) => connection._id !== action.meta.arg
          );
        }
      })
      .addCase(unfriendConnection.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.connections = null;
    });
  },
});

export default connectionSlice.reducer;
