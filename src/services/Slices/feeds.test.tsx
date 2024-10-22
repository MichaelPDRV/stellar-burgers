import feedReducer, { initialState, getFeeds } from './feedsSlice';

describe('feedsSlice reducer', () => {
  test('isLoading должен быть true при getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  test('Обрабатываем getFeeds.fulfilled', () => {
    const mockPayload = {
      orders: [{ id: '1', name: 'Order 1' }],
      total: 99,
      totalToday: 5
    };
    const action = { type: getFeeds.fulfilled.type, payload: mockPayload };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(mockPayload.total);
    expect(state.totalToday).toBe(mockPayload.totalToday);
    expect(state.error).toBeUndefined();
  });

  test('Обрабатываем getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'Error' }
    };
    const state = feedReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([]);
    expect(state.total).toBe(0);
    expect(state.totalToday).toBe(0);
    expect(state.error).toBe('Error');
  });
});
