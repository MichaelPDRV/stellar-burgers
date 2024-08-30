import { TConstructorIngredient } from '../../utils/types';
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';

interface IBurgerConstructor {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TConstructorIngredient) => {
        const id = nanoid();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    updateAll: (state, action: PayloadAction<TConstructorIngredient[]>) => {
      state.ingredients = action.payload;
    }
  },
  selectors: {
    selectItems: (state: IBurgerConstructor) => state
  }
});

export const { addIngredient, removeIngredient, clearConstructor, updateAll } =
  burgerConstructorSlice.actions;
export const selectIngredients = (state: IBurgerConstructor) => state;
export const burgerConstructorSelector = burgerConstructorSlice.selectors;
