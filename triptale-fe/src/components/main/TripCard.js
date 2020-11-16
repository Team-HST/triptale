import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  cardActions: {
    textAlign: 'center',
  },
  cardContent: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:56:27
 * @modify date 2020-11-05 23:56:27
 * @desc [여행 카드 컴포넌트]
 */
function TripCard({ trip, onTripCardClick, onTripDetailClick, onTripDeleteClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => onTripCardClick(trip)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={
            trip.thumbnailFileNo
              ? `/api/system/storage/files/${trip.thumbnailFileNo}`
              : require('styles/images/no-image.png')
          }
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography className={classes.cardContent} gutterBottom variant="h6">
            {trip.title}
          </Typography>
          <Typography
            className={classes.cardContent}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {trip.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <Grid container>
          <Grid item xs={6}>
            <Button size="small" onClick={() => onTripDetailClick(trip)}>
              Detail
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button size="small" color="secondary" onClick={() => onTripDeleteClick(trip.no)}>
              Delete
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}

TripCard.propTypes = {
  trip: PropTypes.object,
  onTripCardClick: PropTypes.func,
  onTripDetailClick: PropTypes.func,
  onTripDeleteClick: PropTypes.func,
};

export default TripCard;
