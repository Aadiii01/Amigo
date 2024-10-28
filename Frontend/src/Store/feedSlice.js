import { BACKEND_URL } from "@/Utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutUser } from "./userSlice";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BACKEND_URL + `/connection/feedUser?page=${page}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const sendConnection = createAsyncThunk(
  "sendConnection",
  async ({ requestId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/connection/request/send/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      return {status,data:response.data};
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const feedSlice = createSlice({
  name: "feedData",
  initialState: {
    feed: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feed = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendConnection.fulfilled, (state, action) => {
        // If you only need to remove the first user after sending a connection, shift() is the better option 
        // due to its simplicity and performance. 
        if (state.feed) {
          state.feed.data.shift();
        }
        // If there’s a chance you may need to remove a specific user based on ID, filter() is the more versatile solution.
        // if (state.feed) {
        //   const { requestId } = action.meta.arg;
        //   state.feed.data = state.feed.data.filter(
        //     (user) => user._id !== requestId
        //   );
        // }
      })
      .addCase(sendConnection.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.feed = null;
    });
  },
});

export default feedSlice.reducer;
