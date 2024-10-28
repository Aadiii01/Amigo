import { BACKEND_URL } from "@/Utils/constant";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BACKEND_URL + "/user/register",
        formData,
        {
          withCredentials: true,
        }
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signInUser = createAsyncThunk(
  "signInUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(BACKEND_URL + "/user/login", formData, {
        withCredentials: true,
      });
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BACKEND_URL + "/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        BACKEND_URL + "/user/check-email-verification",
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

export const checkUser = createAsyncThunk(
  "checkUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(BACKEND_URL + "/user/profile", {
        withCredentials: true, // Send cookies with the request
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadPhotos = createAsyncThunk(
  "uploadPhotos ",
  async (photofiles, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("photos", photofiles);
      const response = await axios.put(
        BACKEND_URL + "/user/upload-photos",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "uploadAvatar ",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await axios.post(
        BACKEND_URL + "/user/avatar",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "updateUserProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        BACKEND_URL + "/user/update-account",
        formData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BACKEND_URL + "/user/forgot-password",
        email,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "resetPassword",
  async ({ id, token, newpassword }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/user/reset-password/${id}/${token}`,
        { newpassword }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "changePassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        BACKEND_URL + "/user/change-password",
        values,
        { withCredentials: true }
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "deleteProfile",
  async (password, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        BACKEND_URL + "/user/deleteprofile",
        {
          data: password,
          withCredentials: true,
        }
      );
      const result = await response.data;
      return result;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "userData",
  initialState: {
    user: null,
    isAuthenticated: false,
    isEmailVerified: false,
    isProfileSetup: false,
    isLoading: false,
    error: null,
    forgotPasswordSuccess: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    // To set user manually (if needed)
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isEmailVerified = false;
    },
    clearForgotPasswordSuccess: (state) => {
      state.forgotPasswordSuccess = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload),
          (state.isAuthenticated = false);
        state.isEmailVerified = false;
      })
      .addCase(registerUser.rejected, (state) => {
        (state.isLoading = false), (state.user = null);
        state.isAuthenticated = false;
      });

    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isEmailVerified = true;
        state.isProfileSetup =
          action?.payload?.data?.isProfilesetup ||
          action?.payload?.data?.user?.isProfilesetup;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEmailVerified = action.payload.isEmailVerified;
        state.isAuthenticated = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(checkUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isEmailVerified = action.payload?.data?.isEmailVerified;
        state.isProfileSetup =
          action?.payload?.data?.isProfilesetup ||
          action?.payload?.data?.user?.isProfilesetup;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });

    // Upload Photos
    builder
      .addCase(uploadPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Update user with new photos
      })
      .addCase(uploadPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Update user with new avatar
        // state.user = { ...state.user, avatar: action.payload.avatar };
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
        state.isProfileSetup = action?.payload?.data?.isProfilesetup;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.forgotPasswordSuccess = false;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.forgotPasswordSuccess = false;
      });

    builder
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, setUser, clearUser, clearForgotPasswordSuccess } =
  userSlice.actions;
export default userSlice.reducer;
