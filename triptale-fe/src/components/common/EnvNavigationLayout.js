import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    width: '100%',
    bottom: 0,
    background: 'whitesmoke',
    zIndex: 2,
  },
  buttonNav: {
    width: '100%',
  },
});

function EnvNavigationLayout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const [isMobile, setIsMobile] = useState(false);

  const onHomeClick = useCallback(() => {
    history.push('/');
  }, [history]);

  const onBackClick = useCallback(() => {
    if (history.location !== '/trip') history.goBack();
  }, [history]);

  useEffect(() => {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      setIsMobile(true);
    }
  }, [history]);

  return (
    <>
      {children}
      {isMobile && (
        <BottomNavigation className={classes.root}>
          <BottomNavigationAction
            className={classes.buttonNav}
            label="back"
            icon={<ArrowBackIcon />}
            onClick={onBackClick}
          />
          <BottomNavigationAction label="home" icon={<HomeIcon />} onClick={onHomeClick} />
        </BottomNavigation>
      )}
    </>
  );
}

EnvNavigationLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default EnvNavigationLayout;
