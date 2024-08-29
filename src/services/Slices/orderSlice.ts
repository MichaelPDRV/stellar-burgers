import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type OrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderError: string | null;
};

const initialState: OrderState = {
  order: null,
  orderRequest: false,
  orderError: null
};

export const placeOrder = createAsyncThunk<
  TOrder,
  string[],
  { rejectValue: string }
>('order/placeOrder', async (ingredientsIds, thunkAPI) => {
  try {
    const response = await orderBurgerApi(ingredientsIds);
    return response.order;
  } catch (error) {
    return thunkAPI.rejectWithValue('Ошибка при отправке заказа');
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.order = null;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.orderRequest = true;
        state.orderError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action: PayloadAction<TOrder>) => {
        state.orderRequest = false;
        state.order = action.payload;
      })
      .addCase(
        placeOrder.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.orderRequest = false;
          state.orderError = action.payload || 'Неизвестная ошибка';
        }
      );
  }
});

export const { resetOrderState } = orderSlice.actions;
export default orderSlice.reducer;
