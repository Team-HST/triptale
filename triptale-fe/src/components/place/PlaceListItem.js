import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
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
    marginTop: '0px',
    minWidth: '25px',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-14 23:37:32
 * @modify date 2021-01-14 23:37:32
 * @desc [장소 목록 표출]
 */
function PlaceListItem({ place, onListClick, onInfoClick }) {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.root}
      alignItems="flex-start"
      button
      onClick={() => onListClick([place.latitude, place.longitude])}
    >
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
          <IconButton className={classes.icon} aria-label="create" onClick={(e) => onInfoClick(e)}>
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
    description: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    placeType: PropTypes.number,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  onListClick: PropTypes.func.isRequired,
  onInfoClick: PropTypes.func.isRequired,
};

export default PlaceListItem;
