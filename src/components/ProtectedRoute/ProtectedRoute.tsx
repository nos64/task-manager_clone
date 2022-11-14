import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export interface ProtectedRouteProps {
  redirectPath: string;
  isAllowed: boolean;
}

const ProtectedRoute = ({ redirectPath, isAllowed }: ProtectedRouteProps) => {
  return isAllowed ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
