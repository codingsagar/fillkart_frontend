import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";
import { clearUser } from "../auth/authSlice";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  products: null,
  product: null,
  searchedProducts: [],
  productCount: [],
};

// for adding a new product

export const newProduct = createAsyncThunk(
  "product/new",
  async (productData, thunkAPI) => {
    try {
      return await productService.newProduct(productData);
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

// update a product

export const updateProduct = createAsyncThunk(
  "product/update",
  async (productId, productData, thunkAPI) => {
    try {
      return await productService.updateProduct(productId, productData);
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

export const allProducts = createAsyncThunk(
  "product/all",
  async ({ category = "", price = "" }, thunkAPI) => {
    try {
      return await productService.allProducts(category, price);
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

export const getProductWithId = createAsyncThunk(
  "product/oneproduct",
  async (productId, thunkAPI) => {
    try {
      return await productService.getProductWithId(productId);
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

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, thunkAPI) => {
    try {
      return await productService.deleteProduct(productId);
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

export const searchProducts = createAsyncThunk(
  "product/search",
  async (searchQuery, thunkAPI) => {
    try {
      return await productService.searchProducts(searchQuery);
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

export const getProductCount = createAsyncThunk(
  "product/count",
  async (thunkAPI) => {
    try {
      return await productService.getProductsCount();
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

export const giveReview = createAsyncThunk(
  "product/giveReview",
  async ({ review, productId, rating }, thunkAPI) => {
    try {
      return await productService.giveReview(review, productId, rating);
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

export const deleteReview = createAsyncThunk(
  "product/deleteReview",
  async ({ reviewId, productId }, thunkAPI) => {
    try {
      return await productService.deleteReview(reviewId, productId);
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

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productStateReset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(newProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(newProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(allProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(allProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.products = null;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getProductWithId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductWithId.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getProductWithId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchedProducts = action.payload;
        state.isLoading = false;
      })
      .addCase(getProductCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productCount = action.payload;
      })
      .addCase(getProductCount.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(giveReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(giveReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(giveReview.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteReview.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { productStateReset } = productSlice.actions;
export default productSlice.reducer;
