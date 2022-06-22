import * as React from 'react';
import { useLocation } from 'react-router-dom';

import { ContextPreventRouter } from '../context/ContextPreventRouter';

//
export const usePreventRoutes = ({ has_effect = true }) => {
  //
  const use_location = useLocation();

  //
  const { refHasInput } = React.useContext(ContextPreventRouter);

  //
  const [displayLocation, setDisplayLocation] = React.useState(use_location);

  //
  has_effect &&
    React.useEffect(() => {
      if (!refHasInput.current) {
        setDisplayLocation(use_location);
      }
    }, [use_location, refHasInput.current]);

  // ----

  const getLocation = () => {
    if (!refHasInput.current) {
      return use_location;
    }

    return undefined;
  };

  // ----

  return { displayLocation, getLocation };
};
