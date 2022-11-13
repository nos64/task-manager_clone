import { ROUTES } from 'common/routes';
import Layout from 'components/Layout';
import BoardsPage from 'pages/BoardsPage';
import EditProfilePage from 'pages/EditProfilePage';
import BoardPage from 'pages/BoardPage/BoardPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => (
  <Routes>
    <Route path={ROUTES.WELCOME} element={<Layout />}>
      {/* <Route index element={<WelcomePage />} />
      <Route path={ROUTES.SIGN_IN} element={<AuthPage />} />
      <Route path={ROUTES.SIGN_UP} element={<AuthPage />} />
      <Route path={ROUTES.PROFILE} element={<EditProfilePage />} /> */}
      <Route path={ROUTES.BOARDS} element={<BoardsPage />} />
      {/* <Route path={ROUTES.BOARD} element={<BoardPage />} />
      <Route path="*" element={<NotFound />} /> */}
      {/* <Route path={ROUTES.SIGN_UP} element={<AuthPage />} />  */}
      <Route path={ROUTES.PROFILE} element={<EditProfilePage />} />
      {/* <Route path={ROUTES.BOARDS} element={<BoardsPage />} />
      <Route path={ROUTES.BOARDS} element={<BoardsPage />} /> */}
      <Route path={ROUTES.BOARD} element={<BoardPage />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Route>
  </Routes>
);

export default App;
