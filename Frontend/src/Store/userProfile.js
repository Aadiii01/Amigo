import { BACKEND_URL } from "@/Utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutUser } from "./userSlice";

export const fetchProfileById = createAsyncThunk(
  "fetchProfileById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/user/userProfile/${id}`,
        { withCredentials: true }
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userProfileSlice = createSlice({
  name: "userProfileData",
  initialState: {
    userProfile: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userProfile = action.payload;
        state.error = null;
      })
      .addCase(fetchProfileById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userProfile = null;
    });
  },
});

export default userProfileSlice.reducer;
