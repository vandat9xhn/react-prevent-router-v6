import * as React from 'react';

import { handleClickPreventLinkType, handleToggleHasIp } from '../type';

//
export const ContextPreventRouter = React.createContext<{
  refHasInput: React.MutableRefObject<boolean>;
  refHrefHasInput: React.MutableRefObject<string>;
  refHasInputFromAppLink: React.MutableRefObject<boolean>;
  //
  handleToggleHasIp: handleToggleHasIp
  changeHistory: () => void;
  handleClickPreventLink: handleClickPreventLinkType;
}>(null);
