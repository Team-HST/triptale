import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import MapIcon from '@material-ui/icons/Map';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1.3),
    maxWidth: 500,
  },
  avatar: {
    backgroundColor: '#ECA726',
  },
  icon: {
    padding: theme.spacing(1),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-08 23:27:46
 * @modify date 2020-12-08 23:27:46
 * @desc 일자 별 카드 컴포넌트
 */
function DayCard({ order, description, date }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {order}
          </Avatar>
        }
        action={
          <React.Fragment>
            <IconButton className={classes.icon} aria-label="create">
              <CreateIcon />
            </IconButton>
            <IconButton className={classes.icon} aria-label="place">
              <MapIcon />
            </IconButton>
          </React.Fragment>
        }
        title="일차"
        subheader={date}
      />
      <CardContent>{description}</CardContent>
    </Card>
  );
}

DayCard.propTypes = {
  order: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.string,
};

export default DayCard;
