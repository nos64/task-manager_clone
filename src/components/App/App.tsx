import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { ROUTES } from 'common/routes';
import Layout from 'components/Layout';
import AuthPage from 'pages/AuthPage';
import BoardsPage from 'pages/BoardsPage';
import EditProfilePage from 'pages/EditProfilePage';
import BoardPage from 'pages/BoardPage/BoardPage';
import { Route, Routes } from 'react-router-dom';
import { getUserById } from 'store/reducers/userSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.scss';

const App: React.FC = () => {
  const isLoginAlreadyExist = useAppSelector((state) => state.user.isLoginAlreadyExist);
  const isAuthorisationError = useAppSelector((state) => state.user.isAuthorisationError);
  const isTokenExpired = useAppSelector((state) => state.user.isTokenExpired);
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
    if (isTokenExpired) {
      toast.warning('Invalid token. Please sign in again', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        className: styles.toastMessageWarning,
        progressClassName: styles.toastProgressBarWarning,
      });
    }
  }, [isTokenExpired]);

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path={ROUTES.WELCOME} element={<Layout />}>
          {/* <Route index element={<WelcomePage />} /> */}
          <Route path={ROUTES.SIGN_IN} element={<AuthPage />} />
          <Route path={ROUTES.SIGN_UP} element={<AuthPage />} />
          <Route path={ROUTES.PROFILE} element={<EditProfilePage />} />
          <Route path={ROUTES.BOARDS} element={<BoardsPage />} />
          <Route path={ROUTES.BOARD} element={<BoardPage />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
      <ToastContainer className={styles.toastError} rtl />
    </>
  );
};

export default App;
