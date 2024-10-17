import {
  userSlice,
  registerUser,
  loginUser,
  updateUser,
  logout,
  initialState
} from './userSlice';
import { TUser } from '../../utils/types';

describe('userSlice reducer', () => {
  test('loginUserError должен быть null при registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBeNull();
  });

  test('isAuthChecked и user должен быть true при registerUser.fulfilled', () => {
    const mockUser: TUser = { email: 'ElonMusk@space.com', name: 'Elon Musk' };
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  test('loginUserError при registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Registration error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBe('Registration error');
  });

  test('loginUserError должен быть null при loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBeNull();
    expect(state.isAuthChecked).toBe(false);
  });

  test('isAuthChecked и user должен быть true при loginUser.fulfilled', () => {
    const mockUser: TUser = { email: 'ElonMusk@space.com', name: 'Elon Musk' };
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.loginUserError).toBeNull();
  });

  test('loginUserError должен быть при loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Login error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBe('Login error');
    expect(state.isAuthChecked).toBe(false);
  });

  test('isAuthChecked должен быть true и обновить юзера при updateUser.fulfilled', () => {
    const mockUser: TUser = {
      email: 'ElonMusk@space.com',
      name: 'Elon Musk'
    };
    const action = { type: updateUser.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  test('loginUserError должен быть при updateUser.rejected', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Update error' }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.loginUserError).toBe('Update error');
    expect(state.isAuthChecked).toBe(false);
  });

  test('Сброс инфы об юзере при logout.fulfilled', () => {
    const action = { type: logout.fulfilled.type };
    const state = userSlice.reducer(initialState, action);

    expect(state.user).toEqual({ email: '', name: '' });
    expect(state.isAuthChecked).toBe(false);
  });
});
