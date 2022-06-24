import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { handleClickPreventLinkType, handleToggleHasIp } from '../type';

//
const getHasIpLocationStr = () => {
  return window.location.pathname;
};

//
export const useNavigatePrevent = () => {
  //
  const location = useLocation();
  const navigate = useNavigate();

  //
  const [show_notice_has_ip, setShowNoticeHasIp] = React.useState(false);

  //
  const refHasInputIdArr = React.useRef<number[]>([]);
  const refHasInput = React.useRef(false);
  const refHrefHasInput = React.useRef('');
  const refHistory = React.useRef({ usr: null, key: '', idx: 0 });

  const refHrefHasInputAppLinkObj = React.useRef({
    to: '',
    replace: false
  });
  const refHasInputFromAppLink = React.useRef(false);

  const refGetHasIpPath =
    React.useRef<typeof getHasIpLocationStr>(getHasIpLocationStr);

  //
  React.useEffect(() => {
    handleChangeLocation();
  }, [location]);

  //
  React.useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // ----

  //
  const getNewID = () => {
    if (refHasInputIdArr.current.length === 0) {
      return 1;
    }

    return refHasInputIdArr.current.slice(-1)[0] + 1;
  };

  //
  const _getHasIpLocationStr = () => {
    return refGetHasIpPath.current();
  };

  //
  const handleToggleHasIp: handleToggleHasIp = ({ id, has_input }) => {
    const new_id = id || getNewID();

    if (has_input) {
      refHasInputIdArr.current.push(new_id);
    } else {
      refHasInputIdArr.current = refHasInputIdArr.current.filter(
        (item) => item !== id
      );
    }

    refHasInput.current = refHasInputIdArr.current.length > 0;
    refHrefHasInput.current = refHasInput.current ? _getHasIpLocationStr() : '';

    console.log(refHasInputIdArr.current);
    return has_input ? new_id : 0;
  };

  //
  const changeHistory = () => {
    refHistory.current = { ...window.history.state };
  };

  //
  const handleChangeLocation = () => {
    if (
      refHasInput.current &&
      _getHasIpLocationStr() !== refHrefHasInput.current
    ) {
      setShowNoticeHasIp(true);
    } else {
      changeHistory();
    }
  };

  //
  const handleConfirm = () => {
    refHasInput.current = false;
    refHrefHasInput.current = '';
    changeHistory();
    setShowNoticeHasIp(false);
  };

  //
  const handleCancel = () => {
    const idx = refHistory.current.idx;

    const action =
      idx === window.history.state.idx
        ? ''
        : idx > window.history.state.idx
        ? 'Back'
        : 'Next';

    if (action === 'Back') {
      navigate(1);
    } else if (action === 'Next') {
      navigate(-1);
    } else {
      if (refHistory.current.key !== window.history.state.key) {
        window.history.replaceState(
          { ...refHistory.current },
          '',
          refHrefHasInput.current
        );
      }
    }

    changeHistory();
    setShowNoticeHasIp(false);
  };

  // ------ CLICK APP LINK

  //
  const handleClickPreventLink: handleClickPreventLinkType = ({
    to,
    replace = false
  }) => {
    refHasInput.current = true;
    refHrefHasInputAppLinkObj.current = { to: to, replace: replace };
    refHasInputFromAppLink.current = true;
    changeHistory();
    setShowNoticeHasIp(true);
  };

  //
  const handleConfirmAppLink = () => {
    navigate(refHrefHasInputAppLinkObj.current.to, {
      replace: refHrefHasInputAppLinkObj.current.replace
    });
    refHasInput.current = false;
    refHrefHasInputAppLinkObj.current = { to: '', replace: false };
    refHasInputFromAppLink.current = false;
    setShowNoticeHasIp(false);
  };

  //
  const handleCancelAppLink = () => {
    refHrefHasInputAppLinkObj.current = { to: '', replace: false };
    refHasInputFromAppLink.current = false;
    setShowNoticeHasIp(false);
  };

  // ----

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (refHasInput.current) {
      return (e.returnValue = '');
    }
  };

  // ----

  return {
    refHasInput,
    refHrefHasInput,
    show_notice_has_ip,
    refHasInputFromAppLink,

    handleToggleHasIp,
    changeHistory,
    handleClickPreventLink,

    handleCancel,
    handleConfirm,
    handleCancelAppLink,
    handleConfirmAppLink
  };
};
