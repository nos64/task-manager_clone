import Layout from 'components/Layout';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}></Route>
  </Routes>
);

export default App;
