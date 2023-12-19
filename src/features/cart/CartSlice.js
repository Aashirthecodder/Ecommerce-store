import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, deleteItemfromCart, fetchItemByUserId, updateItem } from "./CartApi";
// import { ITEMS_PER_PAGE } from "../../app/constants";

const initialState = {
  status: "idle",
  items: [],
};

export const addToCartAsync = createAsyncThunk("cart/addToCart", async (item) => {
  const response = await addToCart(item);

  return response.data;
});

export const updateItemAsync = createAsyncThunk("cart/updateItem", async (update) => {
  const response = await updateItem(update);

  return response.data;
});

export const fetchItemByUserIdAsync = createAsyncThunk("cart/fetchItemByUserId", async (userId) => {
  const response = await fetchItemByUserId(userId);

  return response.data;
});

export const deleteItemfromCartAsync = createAsyncThunk("cart/deleteItemfromCart", async (itemId) => {
  const response = await deleteItemfromCart(itemId);

  return response.data;
});

export const counterSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        console.log(state,"old")
        state.status = "idle";
        state.items.push(action.payload);
        console.log(state,"new")
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteItemfromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemfromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        state.items.splice(index, 1);
      });
  },
});

export const { increment } = counterSlice.actions;

export const selectItems = (state) => state.cart.items;

export default counterSlice.reducer;
