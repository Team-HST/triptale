import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import Map from 'components/kakaoMap/Map';
import Circle from 'components/kakaoMap/Circle';
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
import Tooltip from '@material-ui/core/Tooltip';

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
    fontSize: 12,
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
 * @create date 2020-11-26 22:21:49
 * @modify date 2020-11-26 22:21:49
 * @desc 여행 상세 모달 컨테이너
 */
function TripInfoModalContainer({
  trip,
  onCloseInfoModalClick,
  onTripModifyClick,
  onTripDeleteClick,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const [mapOptions, setMapOptions] = useState({
    mapId: 'infoMap',
    center: [trip.latitude, trip.longitude],
    level: 8,
  });

  useEffect(() => {
    setMapOptions((state) => ({
      ...state,
      center: [trip.latitude, trip.longitude],
    }));
  }, [trip.latitude, trip.longitude]);

  const handleExpandClick = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  return (
    <div className={clsx(classes.paper, classes.modal)}>
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={onCloseInfoModalClick}>
              <CloseIcon />
            </IconButton>
          }
          title={trip.title}
          subheader={`${trip.startAt} - ${trip.endAt}`}
        />
        <CardMedia
          className={classes.media}
          image={
            trip.thumbnailFileNo
              ? `/api/system/storage/files/${trip.thumbnailFileNo}`
              : require('styles/images/no-image.png')
          }
          title="Paella dish"
        />
        <CardContent className={classes.cardContent}>
          <p>여행 내용</p>
          <Typography variant="body2" color="textSecondary" component="p">
            {trip.description}
          </Typography>
          {trip.materials && (
            <>
              <p>준비물</p>
              <Typography variant="body2" color="textSecondary" component="p">
                {trip.materials}
              </Typography>
            </>
          )}

          <p>
            목적지{' '}
            <span className={classes.areaSpan}>(위치를 보시려면 아래 화살표를 눌러주세요!)</span>
          </p>
          <Typography variant="body2" color="textSecondary" component="p">
            {trip.area}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="수정" placement="top">
            <IconButton aria-label="modify trip" onClick={onTripModifyClick}>
              <CreateIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="삭제" placement="top">
            <IconButton aria-label="modify trip" onClick={(e) => onTripDeleteClick(trip.no)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
              <Circle
                options={{
                  center: [trip.latitude, trip.longitude],
                  radius: 2000,
                  strokeWeight: 4,
                  strokeColor: '#2671EC',
                  strokeOpacity: 1,
                  strokeStyle: 'dashed',
                  fillColor: '#2671EC',
                  fillOpacity: 0.5,
                }}
              ></Circle>
            </Map>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

TripInfoModalContainer.propTypes = {
  trip: PropTypes.object.isRequired,
  onCloseInfoModalClick: PropTypes.func.isRequired,
  onTripModifyClick: PropTypes.func.isRequired,
  onTripDeleteClick: PropTypes.func.isRequired,
};

export default TripInfoModalContainer;
