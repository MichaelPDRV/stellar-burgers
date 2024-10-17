import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  IBurgerConstructor,
  updateAll
} from './burgerConstructorSlice';
import { TConstructorIngredient } from '../../utils/types';

jest.mock('nanoid', () => ({
  nanoid: () => 'test-nanoid' // Мокаем nanoid для генерации одинакового id
}));

describe('burgerConstructorSlice', () => {
  test('Тест на изменения порядка ингредиентов в начинке', () => {
    const initialState: IBurgerConstructor = {
      bun: null,
      ingredients: [
        {
          id: 'ingredient-1',
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Ингредиент 1',
          type: 'main',
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
          id: 'ingredient-2',
          _id: '643d69a5c3f7b9001cfa0942',
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
      ]
    };

    // Новый порядок ингредиентов
    const reorderedIngredients = [
      {
        id: 'ingredient-2',
        _id: '643d69a5c3f7b9001cfa0942',
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
      },
      {
        id: 'ingredient-1',
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Ингредиент 1',
        type: 'main',
        proteins: 50,
        fat: 20,
        carbohydrates: 30,
        calories: 500,
        price: 100,
        image: 'image_1.png',
        image_mobile: 'image_1_mobile.png',
        image_large: 'image_1_large.png'
      }
    ];

    // Применяем экшен reorderIngredients для изменения порядка
    const newState = burgerConstructorSlice.reducer(
      initialState,
      updateAll(reorderedIngredients)
    );

    // Проверяем, что порядок ингредиентов изменился
    expect(newState.ingredients).toHaveLength(2);
    expect(newState.ingredients[0].id).toBe('ingredient-2');
    expect(newState.ingredients[1].id).toBe('ingredient-1');
  });

  test('Тест на добавление ингредиента', () => {
    const initialState = {
      bun: null,
      ingredients: []
    };

    const newIngredient: TConstructorIngredient = {
      id: 'test-nanoid',
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    };

    let state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(newIngredient)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main'
      })
    );
  });

  test('Тест на удаление ингредиента', () => {
    const initialState = {
      bun: null,
      ingredients: [] as TConstructorIngredient[]
    };
    const ingredientToRemove: TConstructorIngredient = {
      id: 'test-nanoid',
      calories: 2674,
      carbohydrates: 300,
      fat: 800,
      name: 'Говяжий метеорит (отбивная)',
      price: 3000,
      proteins: 800,
      type: 'main',
      _id: '643d69a5c3f7b9001cfa0940',
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png'
    };

    let state = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(ingredientToRemove)
    );

    const addedIngredient = state.ingredients[0];

    expect(state.ingredients.length).toBe(1);
    expect(addedIngredient).toEqual(
      expect.objectContaining({ _id: '643d69a5c3f7b9001cfa0940' })
    );

    // Удаляем ингредиент с тем же id
    state = burgerConstructorSlice.reducer(
      state,
      removeIngredient(addedIngredient) // Передаем добавленный объект для удаления
    );

    // Ожидаем, что ингредиент будет удален
    expect(state.ingredients.length).toBe(0);
  });

  test('Замена булки', () => {
    // Начальное состояние с одной булочкой
    let state: IBurgerConstructor = {
      bun: {
        id: 'test-nanoid',
        _id: '2',
        name: 'old bun',
        type: 'bun',
        proteins: 50,
        calories: 220,
        carbohydrates: 110,
        fat: 12,
        price: 6,
        image: 'old_image.png',
        image_large: 'old_image_large.png',
        image_mobile: 'old_image_mobile.png'
      },
      ingredients: []
    };

    // Новая булочка, которую мы собираемся добавить
    const newBun: TConstructorIngredient = {
      id: 'test-nanoid',
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    // Добавляем новую булочку и заменяем старую
    state = burgerConstructorSlice.reducer(state, addIngredient(newBun));

    expect(state.bun).toEqual(
      expect.objectContaining({
        _id: newBun._id,
        name: newBun.name,
        type: newBun.type,
        proteins: newBun.proteins,
        fat: newBun.fat,
        carbohydrates: newBun.carbohydrates,
        calories: newBun.calories,
        price: newBun.price,
        image: newBun.image,
        image_large: newBun.image_large,
        image_mobile: newBun.image_mobile
      })
    );
  });
});
