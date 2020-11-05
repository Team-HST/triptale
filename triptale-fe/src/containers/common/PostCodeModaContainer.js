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

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-06 00:02:56
 * @modify date 2020-11-06 00:02:56
 * @desc [주소 검색 모달 컨테이너 컴포넌트]
 */
function PostCodeModaContainer({ handlePostCodeComplete }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();

  return (
    <div style={modalStyle} className={classes.paper}>
      <DaumPostcode onComplete={(e) => handlePostCodeComplete(e)} />
    </div>
  );
}

PostCodeModaContainer.propTypes = {
  handlePostCodeComplete: PropTypes.func,
};

export default PostCodeModaContainer;
