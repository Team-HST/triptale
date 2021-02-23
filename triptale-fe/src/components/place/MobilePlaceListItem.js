import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  placeImg: {
    width: 130,
    height: 120,
    marginRight: 10,
  },
  listItemText: {
    display: 'block',
    wordBreak: 'break-all',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginLeft: theme.spacing(1),
  },
  icon: {
    padding: '0px',
  },
  listItemIcon: {
    position: 'relative',
    top: '-10px',
    minWidth: '25px',
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function MobilePlaceListItem({ place, onListClick, onInfoClick }) {
  const classes = useStyles();

  return (
    <ListItem
      alignItems="flex-start"
      button
      onClick={() => onListClick([place.latitude, place.longitude])}
    >
      <ListItemAvatar>
        {place.thumbnailUrl ? (
          <Avatar className={classes.avatar} alt={place.thumbnailUrl} src={place.thumbnailUrl} />
        ) : (
          <Avatar
            className={classes.avatar}
            alt={'기본 이미지'}
            src={require('styles/images/no-image.png')}
          />
        )}
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="subtitle1" className={classes.listItemText}>
            {place.title}
          </Typography>
        }
        secondary={
          <Typography
            component="span"
            variant="body2"
            className={classes.listItemText}
            color="textPrimary"
          >
            {place.name}
          </Typography>
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

MobilePlaceListItem.propTypes = {
  place: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    type: PropTypes.number,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  onListClick: PropTypes.func.isRequired,
  onInfoClick: PropTypes.func.isRequired,
};

export default MobilePlaceListItem;
