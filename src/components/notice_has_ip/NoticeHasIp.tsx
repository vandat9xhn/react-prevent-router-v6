import * as React from 'react';

import Portal from '../portal/Portal';

import styles from './NoticeHasIp.module.css';

//
export interface NoticeHasIpProps {
  handleConfirm: () => void;
  handleCancel: () => void;
}

//
function NoticeHasIp({ handleConfirm, handleCancel }: NoticeHasIpProps) {
  //
  return (
    <Portal>
      <div className={styles['NoticeHasIp']}>
        <div className={styles['NoticeHasIp_contain']}>
          <div>Do you want to quit, your data will lost?</div>

          <div className={styles['NoticeHasIp_btns']}>
            <button
              className={styles['NoticeHasIp_btn']}
              type='button'
              onClick={handleConfirm}
            >
              Yes
            </button>

            <button
              className={`${styles['NoticeHasIp_btn']} ${styles['NoticeHasIp_btn-cancel']}`}
              type='button'
              onClick={handleCancel}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
}

export default NoticeHasIp;
