import Layout from 'components/Layout';
import EditProfilePage from 'pages/EditProfilePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route path="/editProfile" element={<EditProfilePage />} />
    </Route>
  </Routes>
);

export default App;
