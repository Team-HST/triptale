import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-06 00:12:43
 * @modify date 2020-12-11 00:03:10
 * @desc [모달 레이아웃 컴포넌트]
 */
function ModalLayout({ children, open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 400,
      }}
    >
      <div>{children}</div>
    </Modal>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ModalLayout;
