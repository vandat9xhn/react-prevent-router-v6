import * as React from 'react';
// import { ContextPreventRouter } from './context/ContextPreventRouter';
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
