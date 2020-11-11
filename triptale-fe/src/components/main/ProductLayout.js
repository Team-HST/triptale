import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.common.white,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '80vh',
      minHeight: 500,
      maxHeight: 600,
    },
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    zIndex: -1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  },
  arrowDown: {
    position: 'absolute',
    bottom: theme.spacing(4),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-06 00:00:44
 * @modify date 2020-11-06 00:00:44
 * @desc [배너 및 푸터 기본정보 표출 레이아웃 컴포넌트]
 */
function ProductLayout({ children, backgroundClassName }) {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background, backgroundClassName)} />
      </Container>
    </section>
  );
}

ProductLayout.propTypes = {
  children: PropTypes.array,
  backgroundClassName: PropTypes.string,
};

export default ProductLayout;
