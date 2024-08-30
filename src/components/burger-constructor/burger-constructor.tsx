import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { placeOrder, resetOrderState } from '../../services/Slices/orderSlice';
import { useSelector, useDispatch } from '../../services/store';
import { RootState } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { clearConstructor } from '../../services/Slices/burgerConstructorSlice';
import { isAuthCheckedUser } from '../../services/Slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(isAuthCheckedUser);

  const { bun, ingredients } = useSelector(
    (state: RootState) => state.burgerConstructor
  );

  const constructorItems = {
    bun: bun || null,
    ingredients: ingredients
  };

  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderData = useSelector((state: RootState) => state.order.order);

  const onOrderClick = () => {
    console.log(isAuth);
    if (!isAuth) {
      return navigate('/login');
    }
    if (!constructorItems.bun?._id || orderRequest) return;

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(placeOrder(ingredientsIds))
      .unwrap()
      .then((order) => {
        console.log('Заказ успешно размещен, номер заказа:', order.number);
      })
      .catch((error) => {
        console.error('Ошибка при размещении заказа:', error);
      });
  };

  const closeOrderModal = () => {
    dispatch(resetOrderState());
    dispatch(clearConstructor());
    navigate('/');
  };

  const price = useMemo(() => {
    let total = constructorItems.bun ? constructorItems.bun.price * 2 : 0;
    for (let i = 0; i < constructorItems.ingredients.length; i++) {
      total += constructorItems.ingredients[i].price;
    }
    return total;
  }, [constructorItems]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      orderModalData={orderData}
      constructorItems={constructorItems}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
