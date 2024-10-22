import { orderSlice, placeOrder, initialState } from './orderSlice';
import { TOrder } from '../../utils/types';

describe('orderSlice reducer', () => {
  test('orderRequest должен быть true при placeOrder.pending', () => {
    const action = { type: placeOrder.pending.type };
    const state = orderSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.orderError).toBeNull();
  });

  test('Обрабатываем placeOrder.fulfilled', () => {
    const mockOrder: TOrder = {
      _id: 'order9999',
      status: 'done',
      name: 'test order',
      createdAt: '2236-01-01T12:00:00Z',
      updatedAt: '2236-01-01T12:00:00Z',
      number: 9999,
      ingredients: ['ingredient1', 'ingredient2']
    };
    const action = { type: placeOrder.fulfilled.type, payload: mockOrder };
    const state = orderSlice.reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.order).toEqual(mockOrder);
    expect(state.orderError).toBeNull();
  });

  test('Обрабатываем placeOrder.rejected', () => {
    const action = {
      type: placeOrder.rejected.type,
      payload: 'Error'
    };
    const state = orderSlice.reducer(initialState, action);

    expect(state.orderRequest).toBe(false);
    expect(state.order).toBeNull();
    expect(state.orderError).toBe('Error');
  });
});
