import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './Slices/ingredientsSlice';
import { burgerConstructorSlice } from './Slices/burgerConstructorSlice';
import { orderSlice } from './Slices/orderSlice';
import { authReducer } from './Slices/userSlice';
import { feedSlice } from './Slices/feedsSlice';
import { allOrdersSlice } from './Slices/allOrdersSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const ingredientsReducer = ingredientsSlice.reducer;
export const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const orderReducer = orderSlice.reducer;
export const ordersReducer = feedSlice.reducer;
export const allOrdersReducer = allOrdersSlice.reducer;

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  user: authReducer,
  feed: ordersReducer,
  allOrders: allOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export default store;
