import React from 'react';

import { Layout } from 'components';
import { Header, SideBar } from 'widgets';
import { Outlet } from 'react-router-dom';

import './App.module.scss';

function App() {
  return (
    <Layout header={<Header />} sidebar={<SideBar />} content={<Outlet />} />
  );
}

export default App;
