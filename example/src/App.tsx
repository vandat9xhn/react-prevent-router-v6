import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
  ContextPreventRouterComponent,
  PreventLink
} from 'react-prevent-router-v6';
// import ContextPreventRouterComponent from './context/ContextPreventRouterComponent';
// import PreventLink from './components/prevent_link/PreventLink';

import 'react-prevent-router-v6/dist/index.css';

import CustomRoutes from './CustomRoutes';


//
const App = () => {
  //
  return (
    <BrowserRouter>
      <ContextPreventRouterComponent>
        <div>
          <div>
            <PreventLink to={'/'}>To home</PreventLink>
          </div>
          <div>
            <PreventLink to={'/about'}>To about</PreventLink>
          </div>
          <div>
            <PreventLink to={'/films'}>To films</PreventLink>
          </div>

          <br />
          <br />

          <CustomRoutes />
        </div>
      </ContextPreventRouterComponent>
    </BrowserRouter>
  );
};

export default App;
