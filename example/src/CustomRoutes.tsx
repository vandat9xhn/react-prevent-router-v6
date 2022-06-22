import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { usePreventRoutes } from 'react-prevent-router-v6';
// import { usePreventRoutes } from './hooks/usePreventRoutes';

import About from './About';

//
export interface CustomRoutesProps {}

//
function CustomRoutes({}: CustomRoutesProps) {
  //
  const { displayLocation } = usePreventRoutes({ has_effect: true });

  //
  return (
    <Routes location={displayLocation}>
      <Route path='/' element={<div>Home</div>} />
      <Route path='/about' element={<About />} />
      <Route path='/films' element={<div>Films</div>} />
    </Routes>
  );
}

export default CustomRoutes;
