import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartService";
import { clearUser } from "../auth/authSlice";

const initialState = {
  cart: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// for adding to cart

export const addToCart = createAsyncThunk(
  "cart/add",
  async (productId, thunkAPI) => {
    try {
      return await cartService.addToCart(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      localStorage.clear();
      thunkAPI.dispatch(clearUser());
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// for removing a product from cart

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (productId, thunkAPI) => {
    try {
      return await cartService.removeFromCart(productId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      localStorage.clear();
      thunkAPI.dispatch(clearUser());
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET CART DATA

export const getCartData = createAsyncThunk("cart/all", async (thunkAPI) => {
  try {
    return await cartService.getCartData();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    localStorage.clear();
    thunkAPI.dispatch(clearUser());
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartStateReset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload.cart;
        state.message = action.payload.message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cart = action.payload.cart;
        state.message = action.payload.message;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartData.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
      })
      .addCase(getCartData.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { cartStateReset, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
