import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import map from 'lodash/map';
import routes from './routes';
import { LayoutOfApp } from './../Layout';

const RouterLayout = () => (
  <BrowserRouter>
    <LayoutOfApp>
      <Routes>
        {map(routes, (route, index) => (
          <Route
            key={route.path + index + 'router'}
            path={route.path}
            exact={route.exact}
            breadcrumb={route.path}
            element={route.component}
            title={route.title}
            layout={route.layout}
          />
        ))}
      </Routes>
    </LayoutOfApp>
  </BrowserRouter>
);

export default RouterLayout;
