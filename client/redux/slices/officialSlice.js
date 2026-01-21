import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOfficials = createAsyncThunk("officials/fetch", async () => {
  const res = await fetch("/api/officials/getOfficials");
  const data = await res.json();
  return data;
});

const officialsSlice = createSlice({
  name: "officials",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfficials.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOfficials.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOfficials.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default officialsSlice.reducer;