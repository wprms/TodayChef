import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Test from './pages/Test';
import Login from './pages/Login';
import Join from './pages/Join';
import Main from './pages/Main';

export interface IApplicationProps {}

const AppInner: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={'/test'} element={<Test />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/join'} element={<Join />} />
          <Route path={'/main'} element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppInner;