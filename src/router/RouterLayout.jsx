import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './../Layout';
import map from 'lodash/map';
import routes from './routes';

const RouterLayout = () => (
  <BrowserRouter>
    <Layout>
      <Routes>
        {map(routes, (route, index) => (
          <Route
            key={route.path + index + 'router'}
            path={route.path}
            exact={route.exact}
            breadcrumb={route.path}
            element={route.component}
            title={route.title}
          />
        ))}
      </Routes>
    </Layout>
  </BrowserRouter>
);

export default RouterLayout;
