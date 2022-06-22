import * as React from 'react';
// import { ContextPreventRouter } from './context/ContextPreventRouter';
import { ContextPreventRouter } from 'react-prevent-router-v6';

//
export interface AboutProps {}

//
function About({}: AboutProps) {
  //
  const { handleHasInput } = React.useContext(ContextPreventRouter);

  //
  const [value, setValue] = React.useState('');

  //
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const new_value = e.target.value;
    handleHasInput(!!new_value);
    setValue(new_value);
  };

  //
  return (
    <div>
      <h1>About</h1>

      <div>
        <input type='text' value={value} onChange={handleChange} />
      </div>
    </div>
  );
}

export default About;
