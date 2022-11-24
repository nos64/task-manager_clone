import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ROUTES } from 'common/routes';
import Layout from 'components/Layout';
import EditProfilePage from 'pages/EditProfilePage';
import BoardPage from 'pages/BoardPage';
import { Route, Routes } from 'react-router-dom';
import { getUserById } from 'store/reducers/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from 'pages/NotFoundPage';
import ProtectedRoute from 'components/ProtectedRoute';
import AuthPage from 'pages/AuthPage';
import BoardsPage from 'pages/BoardsPage';
import WelcomePage from 'pages/WelcomePage';
import useAppToasts from 'hooks/useAppToasts';

const App: React.FC = () => {
  const isRoutesProtected = useAppSelector((state) => state.user.isRoutesProtected);

  const dispatch = useAppDispatch();

  useAppToasts();

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path={ROUTES.WELCOME} element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route
            element={<ProtectedRoute isAllowed={!isRoutesProtected} redirectPath={ROUTES.BOARDS} />}
          >
            <Route path={ROUTES.SIGN_IN} element={<AuthPage />} />
            <Route path={ROUTES.SIGN_UP} element={<AuthPage />} />
          </Route>
          <Route
            element={<ProtectedRoute isAllowed={isRoutesProtected} redirectPath={ROUTES.WELCOME} />}
          >
            <Route path={ROUTES.PROFILE} element={<EditProfilePage />} />
            <Route path={ROUTES.BOARDS} element={<BoardsPage />} />
            <Route path={ROUTES.BOARD} element={<BoardPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <ToastContainer rtl />
    </>
  );
};

export default App;
