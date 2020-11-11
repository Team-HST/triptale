import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

function ModalLayout({ children, open, onModalCloseClick }) {
  return (
    <Modal
      open={open}
      onClose={onModalCloseClick}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div>{children}</div>
    </Modal>
  );
}

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-06 00:12:43
 * @modify date 2020-11-06 00:12:43
 * @desc [모달 레이아웃 컴포넌트]
 */
ModalLayout.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onModalCloseClick: PropTypes.func,
};

export default ModalLayout;
