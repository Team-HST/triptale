import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';

function ModalLayout({ children, open, handleModalCloseClick }) {
  return (
    <Modal
      open={open}
      onClose={handleModalCloseClick}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {children}
    </Modal>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.element,
  open: PropTypes.bool,
  handleModalCloseClick: PropTypes.func,
};

export default ModalLayout;
