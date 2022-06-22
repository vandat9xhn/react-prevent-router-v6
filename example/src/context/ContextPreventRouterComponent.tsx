import * as React from 'react';

import { ContextPreventRouter } from './ContextPreventRouter';

import { useNavigatePrevent } from '../hooks/useNavigatePrevent';

import NoticeHasIp from '../components/notice_has_ip/NoticeHasIp';

//
export interface ContextPreventRouterComponentProps {
  NoticeHasIpComponent?: typeof NoticeHasIp;
  children: React.ReactElement;
}

//
function ContextPreventRouterComponent({
  NoticeHasIpComponent = NoticeHasIp,
  children
}: ContextPreventRouterComponentProps) {
  //
  const {
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
  } = useNavigatePrevent();

  //
  return (
    <ContextPreventRouter.Provider
      value={{
        refHasInput: refHasInput,
        refHrefHasInput: refHrefHasInput,
        refHasInputFromAppLink: refHasInputFromAppLink,
        //
        handleHasInput: handleHasInput,
        changeHistory,
        handleClickPreventLink
      }}
    >
      <React.Fragment>
        {children}

        {show_notice_has_ip && (
          <NoticeHasIpComponent
            handleCancel={
              refHasInputFromAppLink.current
                ? handleCancelAppLink
                : handleCancel
            }
            handleConfirm={
              refHasInputFromAppLink.current
                ? handleConfirmAppLink
                : handleConfirm
            }
          />
        )}
      </React.Fragment>
    </ContextPreventRouter.Provider>
  );
}

export default ContextPreventRouterComponent;
