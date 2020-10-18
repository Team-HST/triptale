import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ProductLayout from 'components/main/ProductLayout';
import SearchBox from 'components/common/SearchBox';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${require('styles/images/login_banner.png')})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
    marginTop: theme.spacing(6),
  },
  h2: {
    marginTop: theme.spacing(2),
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  searchBox: {
    marginTop: theme.spacing(10),
  },
  more: {
    marginTop: theme.spacing(6),
  },
}));

function ImageBannerContainer() {
  const classes = useStyles();
  const [searchNm, setSearchNm] = useState('');

  const evnetHandler = {
    handlerSearchNmChange: (e) => {
      setSearchNm(e.target.value);
    },
  };

  return (
    <ProductLayout backgroundClassName={classes.background}>
      <Typography
        className={classes.h2}
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
      >
        Hello. TripTale
      </Typography>
      <Typography className={classes.h5} color="inherit" align="center" variant="h5">
        We pray for your happy journey.
      </Typography>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
      >
        Register
      </Button>
      <div className={classes.searchBox}>
        <SearchBox searchNm={searchNm} handlerSearchNmChange={evnetHandler.handlerSearchNmChange} />
      </div>
      <Typography className={classes.more} color="inherit" variant="body2">
        Record your trip
      </Typography>
    </ProductLayout>
  );
}

export default ImageBannerContainer;
