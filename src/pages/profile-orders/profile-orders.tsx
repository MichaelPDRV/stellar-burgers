import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllOrders, ordersList } from '../../services/Slices/allOrdersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const orders: TOrder[] = useSelector(ordersList);
  return <ProfileOrdersUI orders={orders} />;
};
