import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DaumPostcode from 'react-daum-postcode';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function PostCodeModal({ handlePostCodeComplete }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();

  return (
    <div style={modalStyle} className={classes.paper}>
      <DaumPostcode onComplete={(e) => handlePostCodeComplete(e)} />
    </div>
  );
}

PostCodeModal.propTypes = {
  handlePostCodeComplete: PropTypes.func,
};

export default PostCodeModal;
