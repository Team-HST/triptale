import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TripCard from 'components/main/TripCard';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function TripCardContainer() {
  const classes = useStyles();

  const eventHandler = {
    handleTripCardClick: () => {
      alert('go trip detail');
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
    </Container>
  );
}

export default TripCardContainer;
