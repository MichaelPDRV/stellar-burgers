import { expect, test } from '@jest/globals';
import { rootReducer } from './store';
import { initialState as ingredientsInitialState } from '../services/Slices/ingredientsSlice';
import { initialState as burgerConstructorInitialState } from '../services/Slices/burgerConstructorSlice';
import { initialState as orderInitialState } from '../services/Slices/orderSlice';
import { initialState as authInitialState } from '../services/Slices/userSlice';
import { initialState as feedInitialState } from '../services/Slices/feedsSlice';
import { initialState as allOrdersInitialState } from '../services/Slices/allOrdersSlice';

describe('rootReducer', () => {
  test('Возвращаем начальное состояния хранилища при unknown action', () => {
    const initialState = {
      ingredients: ingredientsInitialState,
      burgerConstructor: burgerConstructorInitialState,
      order: orderInitialState,
      user: authInitialState,
      feed: feedInitialState,
      allOrders: allOrdersInitialState
    };

    const action = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, action);

    expect(state).toEqual(initialState);
  });
});
