import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";
import { clearUser } from "../auth/authSlice";

const initialState = {
  userOrders: [],
  allOrders: [],
  totalOrders: 0,
  totalSales: 0,
  lastOrderValue: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// for getting user orders

export const getUserOrders = createAsyncThunk(
  "order/userOrders",
  async (thunkAPI) => {
    try {
      return await orderService.getOrders();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.removeItem("user");
      thunkAPI.dispatch(clearUser());
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// for removing a product from cart

export const getAllOrders = createAsyncThunk(
  "orders/allOrders",
  async (thunkAPI) => {
    try {
      return await orderService.getAllOrders();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.removeItem("user");
      thunkAPI.dispatch(clearUser());
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// for fetching sales data

export const getSalesData = createAsyncThunk(
  "orders/salesData",
  async (thunkAPI) => {
    try {
      return await orderService.getSalesData();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.removeItem("user");
      thunkAPI.dispatch(clearUser());
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderStateReset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetOrders: (state) => {
      state.userOrders = [];
      state.allOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userOrders = action.payload.orders;
        state.message = action.payload.message;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allOrders = action.payload.orders;
        state.message = action.payload.message;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSalesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalOrders = action.payload.totalOrders;
        state.lastOrderValue = action.payload.lastOrderValue;
        state.totalSales = action.payload.totalSales;
        state.message = action.payload.message;
      })
      .addCase(getSalesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.totalOrders = 0;
        state.lastOrderValue = 0;
        state.totalSales = 0;
      });
  },
});

export const { orderStateReset, resetOrders } = orderSlice.actions;
export default orderSlice.reducer;
