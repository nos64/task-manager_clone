import { ROUTES } from 'common/routes';
import Layout from 'components/Layout';
import { useAppDispatch } from 'hooks/redux';
import AuthPage from 'pages/AuthPage';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getUserById } from 'store/reducers/userSlice';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  return (
    <Routes>
      <Route path={ROUTES.WELCOME} element={<Layout />}>
        {/* <Route index element={<WelcomePage />} /> */}
        <Route path={ROUTES.SIGN_IN} element={<AuthPage />} />
        <Route path={ROUTES.SIGN_UP} element={<AuthPage />} />
        {/* <Route path={ROUTES.PROFILE} element={<EditProfilePage />} /> */}
        {/* <Route path={ROUTES.BOARDS} element={<BoardsPage />} /> */}
        {/* <Route path={ROUTES.BOARD} element={<BoardPage />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
