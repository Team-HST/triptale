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
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(0.5)}px auto`,
    width: '100%',
  },
  avatar: {
    backgroundColor: '#ECA726',
  },
  icon: {
    padding: theme.spacing(0.5),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-08 23:27:46
 * @modify date 2020-12-08 23:27:46
 * @desc 일자 별 카드 컴포넌트
 */
function DayCard({ daySchedule, onDayModifyClick, onDeleteDaySchedule }) {
  const classes = useStyles();
  const { order, description, date } = daySchedule;

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
            <Tooltip title="수정">
              <IconButton
                className={classes.icon}
                aria-label="create"
                onClick={(e) => onDayModifyClick(daySchedule)}
              >
                <CreateIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="장소설정">
              <IconButton className={classes.icon} aria-label="place">
                <MapIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="삭제">
              <IconButton
                className={classes.icon}
                aria-label="delete"
                onClick={(e) => onDeleteDaySchedule(daySchedule)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </React.Fragment>
        }
        title="일차"
        subheader={date}
      />
      <CardContent>{description || `${order}일차 여행 설명을 등록해주세요!`}</CardContent>
    </Card>
  );
}

DayCard.propTypes = {
  order: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.string,
};

export default React.memo(DayCard);
