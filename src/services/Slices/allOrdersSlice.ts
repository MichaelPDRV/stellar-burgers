import { getOrdersApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getAllOrders = createAsyncThunk('orders/ofUser', getOrdersApi);
export interface TOrdersState {
  orders: Array<TOrder>;
  isLoading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  isLoading: true
};

export const allOrdersSlice = createSlice({
  name: 'allOrders',
  initialState,
  reducers: {},
  selectors: {
    ordersList: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { ordersList } = allOrdersSlice.selectors;
