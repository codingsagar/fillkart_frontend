import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// getting the user from the local storage if already logged in

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  allUsers: [],
};

// for registering the user

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// for logging in user

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);

    return thunkAPI.rejectWithValue(message);
  }
});

// logout

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.removeItem("user");
    thunkAPI.dispatch(clearUser());
    console.log(message);

    return thunkAPI.rejectWithValue(message);
  }
});

// GET ALL USERS

export const getAllUsers = createAsyncThunk("get/users", async (thunkAPI) => {
  try {
    return await authService.getAllUsers();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.removeItem("user");
    thunkAPI.dispatch(clearUser());
    console.log(message);

    return thunkAPI.rejectWithValue(message);
  }
});

// update user role
export const updateUserRole = createAsyncThunk(
  "update/user_role",
  async (user_id, thunkAPI) => {
    try {
      return await authService.updateUserRole(user_id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.removeItem("user");
      thunkAPI.dispatch(clearUser());
      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// delete a user
export const deleteUser = createAsyncThunk(
  "delete/user",
  async (user_id, thunkAPI) => {
    try {
      return await authService.deleteUser(user_id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.removeItem("user");
      thunkAPI.dispatch(clearUser());
      console.log(message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.isLoading = false;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearUser } = authSlice.actions;
export default authSlice.reducer;
