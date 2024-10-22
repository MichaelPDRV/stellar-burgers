import { allOrdersSlice, initialState, getAllOrders } from './allOrdersSlice';

describe('allOrdersSlice', () => {
  test('Обрабатываем getAllOrders.fulfilled', () => {
    const mockOrders = [
      { id: 1, name: 'Order 1' },
      { id: 2, name: 'Order 2' }
    ];
    const action = { type: getAllOrders.fulfilled.type, payload: mockOrders };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('Обрабатываем getAllOrders.pending', () => {
    const action = { type: getAllOrders.pending.type };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });

  test('Обрабатываем getAllOrders.rejected', () => {
    const action = { type: getAllOrders.rejected.type };
    const state = allOrdersSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([]);
  });
});
