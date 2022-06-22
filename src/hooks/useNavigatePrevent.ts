import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { handleClickPreventLinkType } from '../type';

//
export const useNavigatePrevent = () => {
  //
  const location = useLocation();
  const navigate = useNavigate();

  //
  const [show_notice_has_ip, setShowNoticeHasIp] = React.useState(false);

  //
  const refHasInput = React.useRef(false);
  const refHrefHasInput = React.useRef('');
  const refHrefHasInputAppLinkObj = React.useRef({
    to: '',
    replace: false
  });
  const refHasInputFromAppLink = React.useRef(false);
  const refHistory = React.useRef({ usr: null, key: '', idx: 0 });

  //
  React.useEffect(() => {
    handleChangeLocation();
  }, [location]);

  // ----

   //
   const handleHasInput = (has_input: boolean) => {
    refHrefHasInput.current = has_input ? window.location.href : '';
    refHasInput.current = has_input;
  };

  //
  const changeHistory = () => {
    refHistory.current = { ...history.state };
  };

  //
  const handleChangeLocation = () => {
    if (
      refHasInput.current &&
      window.location.href != refHrefHasInput.current
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
      idx == history.state.idx ? '' : idx > history.state.idx ? 'Back' : 'Next';

    if (action == 'Back') {
      navigate(1);
    } else if (action == 'Next') {
      navigate(-1);
    } else {
      if (refHistory.current.key !== history.state.key) {
        history.replaceState(
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

  return {
    refHasInput,
    refHrefHasInput,
    show_notice_has_ip,
    refHasInputFromAppLink,

    handleHasInput,
    changeHistory,
    handleClickPreventLink,

    handleCancel,
    handleConfirm,
    handleCancelAppLink,
    handleConfirmAppLink
  };
};
