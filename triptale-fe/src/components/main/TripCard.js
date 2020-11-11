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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:56:27
 * @modify date 2020-11-05 23:56:27
 * @desc [여행 카드 컴포넌트]
 */
function TripCard({ trip, handleTripCardClick }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => handleTripCardClick(trip)}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={`/api/system/storage/files/${trip.thumbnailFileNo}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {trip.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {trip.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

TripCard.propTypes = {
  trip: PropTypes.object,
  handleTripCardClick: PropTypes.func,
};

export default TripCard;
