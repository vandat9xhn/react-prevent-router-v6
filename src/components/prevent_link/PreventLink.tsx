import * as React from 'react';

import { ContextPreventRouter } from '../../context/ContextPreventRouter';

import SameLink, { SameLinkProps } from '../same_link/SameLink';

//
export type PreventLinkProps = SameLinkProps;

//
function PreventLink({ children, ...rest_props }: PreventLinkProps) {
  //
  const { refHasInput, handleClickPreventLink } =
    React.useContext(ContextPreventRouter);

  // ----

  //
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (refHasInput.current) {
      e.preventDefault();
      handleClickPreventLink({
        to: rest_props.to as string,
        replace: rest_props.replace
      });
    }
  };

  //
  return (
    <SameLink {...rest_props} onClick={handleClick}>
      {children}
    </SameLink>
  );
}

export default PreventLink;
