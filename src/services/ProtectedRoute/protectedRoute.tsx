import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../store';
import { isAuthCheckedUser } from '../Slices/userSlice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedUser);
  const location = useLocation();

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
