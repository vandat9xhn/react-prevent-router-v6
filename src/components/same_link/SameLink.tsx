import * as React from 'react';

import { Link, LinkProps } from 'react-router-dom';

//
export type SameLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

//
function SameLink({ children, ...rest_props }: SameLinkProps) {
  // ----

  //
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (window.location.href === window.location.origin + rest_props.to) {
      e.preventDefault();
    } else {
      rest_props.onClick && rest_props.onClick(e);
    }
  };

  //
  return (
    <Link {...rest_props} onClick={handleClick}>
      {children}
    </Link>
  );
}

export default SameLink;
