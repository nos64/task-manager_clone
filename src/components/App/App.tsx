import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ROUTES } from 'common/routes';
import Layout from 'components/Layout';
import EditProfilePage from 'pages/EditProfilePage';
import BoardPage from 'pages/BoardPage';
import { Route, Routes } from 'react-router-dom';
import { getUserById } from 'store/reducers/userSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.scss';
import NotFoundPage from 'pages/NotFoundPage';
import ProtectedRoute from 'components/ProtectedRoute';
import AuthPage from 'pages/AuthPage';
import BoardsPage from 'pages/BoardsPage';

const App: React.FC = () => {
  const isLoginAlreadyExist = useAppSelector((state) => state.user.isLoginAlreadyExist);
  const isAuthorisationError = useAppSelector((state) => state.user.isAuthorisationError);
  const isTokenRequireUpdate = useAppSelector((state) => state.user.isTokenRequireUpdate);
  const isRoutesProtected = useAppSelector((state) => state.user.isRoutesProtected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoginAlreadyExist || isAuthorisationError) {
      const message = isLoginAlreadyExist ? 'Login already exists' : 'Wrong login or password';

      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessage,
        progressClassName: styles.toastProgressBar,
      });
    }
  }, [isLoginAlreadyExist, isAuthorisationError]);

  useEffect(() => {
    if (isTokenRequireUpdate) {
      toast.warning('Invalid token. Please sign in again', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessageWarning,
        progressClassName: styles.toastProgressBarWarning,
      });
    }
  }, [isTokenRequireUpdate]);

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path={ROUTES.WELCOME} element={<Layout />}>
          {/* <Route index element={<WelcomePage />} /> */}
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
      <ToastContainer className={styles.toastError} rtl />
    </>
  );
};

export default App;
