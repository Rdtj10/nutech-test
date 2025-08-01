import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBalance } from "../../service/action/transaction";

export const fetchBalance = createAsyncThunk("balance/fetch", async () => {
  const res = await getBalance();
  return res.data.balance;
});

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    value: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload;
      });
  },
});

export default balanceSlice.reducer;
