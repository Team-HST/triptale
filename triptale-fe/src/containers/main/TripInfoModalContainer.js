import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// import ModalLayout from 'components/common/ModalLayout';
// import TripInfoModalContainer from 'containers/main/TripInfoModalContainer';
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
import CloseIcon from '@material-ui/icons/Close';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
 * @create date 2020-11-26 22:21:49
 * @modify date 2020-11-26 22:21:49
 * @desc 여행 상세 모달 컨테이너
 */
function TripInfoModalContainer({ trip, onCloseInfoModalClick, onTripModifyClick }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();
  const [expanded, setExpanded] = useState(false);

  const [mapOptions, setMapOptions] = useState({
    mapId: 'createMap',
    center: [trip.longitude, trip.latitude],
    level: 8,
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={modalStyle} className={classes.paper}>
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings" onClick={onCloseInfoModalClick}>
              <CloseIcon />
            </IconButton>
          }
          title={trip.title}
          subheader={`${trip.startAt}`}
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
            <React.Fragment>
              <p>준비물</p>
              <Typography variant="body2" color="textSecondary" component="p">
                {trip.materials}
              </Typography>
            </React.Fragment>
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
          <IconButton aria-label="modify trip" onClick={onTripModifyClick}>
            <CreateIcon />
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
              <Circle
                options={{
                  center: [trip.longitude, trip.latitude],
                  radius: 1500,
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
};

export default TripInfoModalContainer;
