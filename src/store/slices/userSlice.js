import { apiFetch } from "@/api/apiFetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


// 1. Create the async thunk to fetch data
export const fetchInstituteDetails = createAsyncThunk(
  "user/fetchInstituteDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetch("/auth/me", {
        method: "GET"
      });

      // Ensure the response is successful and contains the institute object
      if (response && response.success && response.institute) {
        return response.institute; // Return ONLY the institute data
      }

      return rejectWithValue("Invalid response format");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const response = await apiFetch(`/institute/users/mapped?page=${page}&limit=10`, {
        method: "GET"
      });

      // Ensure the response is successful and contains the institute object
      if (response && response.success) {
        return response.items; // Return ONLY the institute data
      }

      return rejectWithValue("Invalid response format");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const searchUsersHandler = createAsyncThunk(
  "user/searchUsers",
  async ({ keyword, setLoading, setEmail }, { rejectWithValue }) => {
    try {
      setLoading(true);
      const response = await apiFetch(`/institute/users/search?keyword=${keyword}`, {
        method: "GET"
      });

      // Ensure the response is successful and contains the institute object
      if (response && response.success) {
        return response.users; // Return ONLY the institute data
      }

      return rejectWithValue("Invalid response format");
    } catch (error) {
      return rejectWithValue(error.message);
    } finally {
      setLoading(false);
    }
  }
);

export const addUserHandler = createAsyncThunk(
  "user/addUser",
  async ({ user, setLoading }, { rejectWithValue }) => {
    try {
      setLoading(true);
      const response = await apiFetch(`/institute/users/map`, {
        method: "POST",
        body: JSON.stringify(user)
      });

      // Ensure the response is successful and contains the institute object
      if (response && response.success) {
        toast.success("User added successfully", { id: "add-user-success" });
        return;
      }
      return rejectWithValue("Invalid response format");
    } catch (error) {
      toast.error("User added failed", { id: "add-user-error" });
      return rejectWithValue(error.message);
    } finally {
      setLoading(false);
    }
  }
);

export const unlinkUserHandler = createAsyncThunk(
  "user/unlinkUser",
  async ({ user, setLoading }, { rejectWithValue }) => {
    try {
      setLoading(true);
      const response = await apiFetch(`/institute/users/remove`, {
        method: "POST",
        body: JSON.stringify(user)
      });

      // Ensure the response is successful and contains the institute object
      if (response && response.success) {
        toast.success("User unlinked successfully", { id: "unlink-user-success" });
        return;
      }
      return rejectWithValue("Invalid response format");
    } catch (error) {
      toast.error("User unlinked failed", { id: "unlink-user-error" });
      return rejectWithValue(error.message);
    } finally {
      setLoading(false);
    }
  }
);


// 2. Create the slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    institute: [],
    users: [],
    searchUsers: [],
  },
  reducers: {
    // Action to clear the data when the user logs out
    clearInstitute: (state) => {
      state.institute = [];
    },
    clearUsers: (state) => {
      state.users = [];
    },
    clearSearchUsers: (state) => {
      state.searchUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // When the API call succeeds, store the institute data
      .addCase(fetchInstituteDetails.fulfilled, (state, action) => {
        state.institute = action.payload;
      })
      // If the API call fails (e.g., 401 Unauthorized), clear the data
      .addCase(fetchInstituteDetails.rejected, (state) => {
        state.institute = [];
      });

    builder
      // When the API call succeeds, store the institute data
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // If the API call fails (e.g., 401 Unauthorized), clear the data
      .addCase(fetchAllUsers.rejected, (state) => {
        state.users = [];
      });

    builder
      // When the API call succeeds, store the institute data
      .addCase(searchUsersHandler.fulfilled, (state, action) => {
        state.searchUsers = action.payload;
      })
      // If the API call fails (e.g., 401 Unauthorized), clear the data
      .addCase(searchUsersHandler.rejected, (state) => {
        state.searchUsers = [];
      });
  },
});

export const { clearInstitute, clearUsers, clearSearchUsers } = userSlice.actions;
export default userSlice.reducer;