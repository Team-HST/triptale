import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  placeImg: {
    width: 120,
    height: 100,
    marginRight: 10,
  },
  description: {
    display: 'block',
    wordBreak: 'break-all',
  },
}));

function PlaceListItem({ place }) {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <div>
        <img className={classes.placeImg} alt={place.thumbnailUrl} src={place.thumbnailUrl} />
      </div>
      <ListItemText
        primary={place.title}
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              className={classes.description}
              color="textPrimary"
            >
              {place.description}
            </Typography>
            {place.name} <br />
            {`${place.startAt} - ${place.endAt}`}
          </>
        }
      />
    </ListItem>
  );
}

PlaceListItem.propTypes = {
  place: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string,
    type: PropTypes.number.isRequired,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlaceListItem;
