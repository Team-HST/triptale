import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
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
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  icon: {
    padding: '0px',
  },
  listItemIcon: {
    minWidth: '30px',
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
      <ListItemIcon className={classes.listItemIcon}>
        <Tooltip title="정보보기">
          <IconButton
            className={classes.icon}
            aria-label="create"
            // onClick={(e) => onDayModifyClick(daySchedule)}
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </ListItemIcon>
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
