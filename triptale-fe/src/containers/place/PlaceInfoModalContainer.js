import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Map from 'components/kakaoMap/Map';
import IconMarker from 'components/kakaoMap/IconMarker';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
      height: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30%',
      height: '80%',
    },
    width: '90%',
    height: '80%',
    overflow: 'auto',
  },
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  areaSpan: {
    fontSize: 3,
    color: 'green',
  },
  map: {
    height: '250px',
  },
  cardContent: {
    paddingBottom: '0px',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-02-08 22:29:18
 * @modify date 2021-02-08 22:29:18
 * @desc [장소 상세 표출 컴포넌트]
 */
function PlaceInfoModalContainer({
  place,
  onClosePlaceModalClick,
  onPlaceModifyClick,
  onPlcaeDeleteClick,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [mapOptions, setMapOptions] = useState({
    mapId: 'placeInfoMap',
    center: [place.latitude, place.longitude],
    level: 4,
  });

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <div className={clsx(classes.paper, classes.modal)}>
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={onClosePlaceModalClick}>
              <CloseIcon />
            </IconButton>
          }
          title={place.title}
          subheader={`${place.startAt} - ${place.endAt}`}
        />
        <CardMedia
          className={classes.media}
          image={place.thumbnailUrl ? place.thumbnailUrl : require('styles/images/no-image.png')}
          title="Paella dish"
        />
        <CardContent className={classes.cardContent}>
          <p>여행 내용</p>
          {place.description && (
            <Typography variant="body2" color="textSecondary" component="p">
              {place.description}
            </Typography>
          )}
          <p>장소 정보</p>
          <Typography variant="body2" color="textSecondary" component="p">
            <a href={place.infoUrl} target="_blank">
              {place.infoUrl}
            </a>
          </Typography>

          <p>
            목적지{' '}
            <span className={classes.areaSpan}>(위치를 보시려면 아래 화살표를 눌러주세요!)</span>
          </p>
          <Typography variant="body2" color="textSecondary" component="p">
            {place.address}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="modify trip" onClick={onPlaceModifyClick}>
            <CreateIcon />
          </IconButton>
          <IconButton aria-label="modify trip" onClick={(e) => onPlcaeDeleteClick(place.placeNo)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Map className={classes.map} options={mapOptions}>
              <IconMarker
                options={{ type: place.type, position: [place.latitude, place.longitude] }}
              />
            </Map>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

PlaceInfoModalContainer.propTypes = {
  place: PropTypes.shape({
    placeNo: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    infoUrl: PropTypes.string,
    address: PropTypes.string,
    type: PropTypes.number.isRequired,
    startAt: PropTypes.string.isRequired,
    endAt: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  onClosePlaceModalClick: PropTypes.func.isRequired,
  onPlaceModifyClick: PropTypes.func.isRequired,
  onPlcaeDeleteClick: PropTypes.func.isRequired,
};

export default PlaceInfoModalContainer;
