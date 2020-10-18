import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TripCard from 'components/main/TripCard';
import * as TestActions from 'store/modules/test';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function TripCardContainer() {
  const classes = useStyles();
  const { num } = useSelector((state) => ({ num: state.test.num }));
  const dispatch = useDispatch();

  const eventHandler = {
    handleTripCardClick: async () => {
      alert('go trip detail');
    },

    handleAddClick: () => {
      let aa = num + 1;
      dispatch(TestActions.setNumberAsync(aa));
    },
  };

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TripCard handleTripCardClick={eventHandler.handleTripCardClick} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TripCard handleTripCardClick={eventHandler.handleTripCardClick} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TripCard handleTripCardClick={eventHandler.handleTripCardClick} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TripCard handleTripCardClick={eventHandler.handleTripCardClick} />
        </Grid>
      </Grid>
      <button onClick={eventHandler.handleAddClick}>테스트 {num}</button>
    </Container>
  );
}

export default TripCardContainer;
