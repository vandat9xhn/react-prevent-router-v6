# react-prevent-router-v6

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-prevent-router-v6.svg)](https://www.npmjs.com/package/react-prevent-router-v6) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-prevent-router-v6
```

## Usage

```tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import {
  ContextPreventRouterComponent,
  PreventLink
} from 'react-prevent-router-v6';
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

import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { usePreventRoutes } from 'react-prevent-router-v6';

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

import * as React from 'react';
import { ContextPreventRouter } from 'react-prevent-router-v6';

//
export interface AboutProps {}

//
function About({}: AboutProps) {
  //
  const { handleToggleHasIp } = React.useContext(ContextPreventRouter);

  //
  const [value1, setValue1] = React.useState('');
  const [value2, setValue2] = React.useState('');

  //
  const refID1 = React.useRef(0);
  const refID2 = React.useRef(0);

  //
  React.useEffect(() => {
    return () => {
      refID1.current &&
        handleToggleHasIp({
          id: refID1.current,
          has_input: false
        });
      refID2.current &&
        handleToggleHasIp({
          id: refID2.current,
          has_input: false
        });
    };
  }, []);

  // ----

  //
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    refID: typeof refID1,
    value: string,
    setValue: typeof setValue1
  ) => {
    const new_value = e.target.value;

    if (value && new_value) {
      setValue(new_value);
      return;
    }

    const new_id = handleToggleHasIp({
      id: refID.current,
      has_input: !!new_value
    });

    refID.current = new_id;
    setValue(new_value);
  };

  //
  const handleChange1: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e, refID1, value1, setValue1);
  };

  //
  const handleChange2: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    handleChange(e, refID2, value2, setValue2);
  };

  //
  return (
    <div>
      <h1>About</h1>

      <div>
        <div>
          <input type='text' value={value1} onChange={handleChange1} />
        </div>

        <div>
          <input type='text' value={value2} onChange={handleChange2} />
        </div>
      </div>
    </div>
  );
}

export default About;

```

## License

MIT © [vandat9xhn](https://github.com/vandat9xhn)
