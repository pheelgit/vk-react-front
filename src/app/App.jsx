import React from 'react';

import { Layout } from 'components';
import { Header, SideBar } from 'widgets';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

import './App.module.scss';

function App() {
  return (
    <>
      <Analytics />
      <Layout header={<Header />} sidebar={<SideBar />} content={<Outlet />} />
    </>
  );
}

export default App;
