import { apiFetch } from "@/api/apiFetch";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// API TO GET TEMPLATES
export const getTemplate = createAsyncThunk(
  "template/fetch-all-templates",
  async () => {
    try {
      // console.log("Try to fetch template data...");
      const response = await apiFetch("/template/all", {
        method: "GET",
      });
      if (response.length > 0) {
        return response;
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.message);
    }
  }
);

export const getCategory = createAsyncThunk(
  "template/fetch-all-category",
  async () => {
    try {
      // console.log("Try to fetch category data...");
      const response = await apiFetch("/template/categories", {
        method: "GET",
      });
      if (response.length > 0) {
        return response;
      }
    } catch (error) {
      // console.log(error);
      toast.error(error?.message);
    }
  }
);

const initialState = {
  template: [],
  category: [],
};

export const templateSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTemplate.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.template = action.payload;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.category = action.payload;
      });
  },
});

export default templateSlice.reducer;
