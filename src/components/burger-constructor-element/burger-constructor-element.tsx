import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector, useDispatch } from '../../services/store';
import {
  removeIngredient,
  updateAll
} from '../../services/Slices/burgerConstructorSlice';
import { TConstructorIngredient } from '@utils-types';
import { RootState } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const constructorItems = useSelector(
      (state: RootState) => state.burgerConstructor
    );

    function moveIngredients(
      ingredients: TConstructorIngredient[],
      index: number,
      step: number
    ): TConstructorIngredient[] {
      const copy = [...ingredients];
      copy[index] = copy.splice(index + step, 1, copy[index])[0];
      return copy;
    }

    const handleMoveDown = () => {
      if (index < constructorItems.ingredients.length - 1) {
        dispatch(
          updateAll(
            moveIngredients(
              constructorItems.ingredients as TConstructorIngredient[],
              index,
              1
            )
          )
        );
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(
          updateAll(
            moveIngredients(
              constructorItems.ingredients as TConstructorIngredient[],
              index,
              -1
            )
          )
        );
      }
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
