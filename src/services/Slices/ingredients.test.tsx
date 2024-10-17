import {
  ingredientsThunk,
  initialState,
  ingredientsSlice
} from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice reducer', () => {
  test('isLoading должен быть true при ingredientsThunk.pending', () => {
    const action = { type: ingredientsThunk.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('Обрабатываем ingredientsThunk.fulfilled', () => {
    const mockIngredients: TIngredient[] = [
      {
        _id: '1',
        name: 'Ингредиент 1',
        type: 'bun',
        proteins: 50,
        fat: 20,
        carbohydrates: 30,
        calories: 500,
        price: 100,
        image: 'image_1.png',
        image_mobile: 'image_1_mobile.png',
        image_large: 'image_1_large.png'
      },
      {
        _id: '2',
        name: 'Ингредиент 2',
        type: 'main',
        proteins: 60,
        fat: 25,
        carbohydrates: 40,
        calories: 600,
        price: 200,
        image: 'image_2.png',
        image_mobile: 'image_2_mobile.png',
        image_large: 'image_2_large.png'
      }
    ];
    const action = {
      type: ingredientsThunk.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  test('Обрабатываем ingredientsThunk.rejected', () => {
    const action = {
      type: ingredientsThunk.rejected.type,
      error: { message: 'Error' }
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([]);
    expect(state.error).toBe('Error');
  });
});
