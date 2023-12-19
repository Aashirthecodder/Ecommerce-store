import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, checkUser, updateUser } from "./authApi";

const initialState = {
  loggedInUser: null,
  value: 0,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk("user/createUser", async (userData) => {
  const response = await createUser(userData);

  return response.data;
});

export const updateUserAsync = createAsyncThunk("user/updateUser", async (update) => {
  const response = await updateUser(update);

  return response.data;
});

export const checkUserAsync = createAsyncThunk("user/checkUser", async (loginInfo,navigate) => {
  const response = await checkUser(loginInfo);

             

  return response.data;
});

export const counterSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      });
  },
});

export const { increment } = counterSlice.actions;
// ... (other imports and code)
export const selectError = (state) => state.auth.error;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export default counterSlice.reducer;
