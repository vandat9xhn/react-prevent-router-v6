import ReactDOM from 'react-dom';

//
export interface PortalProps {
  children: React.ReactElement;
}

//
function Portal({ children }: PortalProps) {
  //
  return ReactDOM.createPortal(
    children,
    document.getElementsByTagName('body')[0]
  );
}

export default Portal;
