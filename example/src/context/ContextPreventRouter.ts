import * as React from 'react';

import { handleClickPreventLinkType } from '../type';

//
export const ContextPreventRouter = React.createContext<{
  refHasInput: React.MutableRefObject<boolean>;
  refHrefHasInput: React.MutableRefObject<string>;
  refHasInputFromAppLink: React.MutableRefObject<boolean>;
  //
  handleHasInput: (has_input: boolean) => void
  changeHistory: () => void;
  handleClickPreventLink: handleClickPreventLinkType;
}>(null);
