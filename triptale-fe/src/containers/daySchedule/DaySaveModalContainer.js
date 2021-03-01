import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import useInput from 'hooks/useInput';
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ColorCode from 'components/common/ColorCode';
import { makeStyles } from '@material-ui/core/styles';

import { dayScheduleService } from 'lib/axios/services';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: '60%',
      height: '225px',
    },
    [theme.breakpoints.up('lg')]: {
      width: '30%',
      height: '225px',
    },
    width: '90%',
    height: '225px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    textAlign: 'center',
  },
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  header: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  colorGrid: {
    overflow: 'auto',
  },
  footerBtn: {
    marginTop: theme.spacing(2),
  },
  closeBtn: {
    marginRight: theme.spacing(1),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-12-10 23:50:19
 * @modify date 2020-12-10 23:50:19
 * @desc [여행 일차 등록 수정 모달 컨테이너]
 */
function DaySaveModalContainer({ daySchedule, label, onSaveModalClose }) {
  const classes = useStyles();
  const { trip } = useSelector((state) => ({ trip: state.daySchedule.trip }));
  const [description, onChangeDescription, setDescription] = useInput('');
  const [colorCode, setColorCode] = useState(null);

  // 색상 변경 이벤트
  const handleColorChange = useCallback((color) => {
    setColorCode(color);
  }, []);

  // 여행 일차 정보 등록, 수정 이벤트
  const handleSaveDaySheduleClick = async () => {
    if (!colorCode) {
      alert('일차 색상을 선택하여 주세요,');
      return;
    }

    if (!daySchedule) {
      try {
        await dayScheduleService.createDaySchedule(trip.no, {
          description,
          colorCode,
        });
      } catch (error) {
        alert('더이상 일차를 추가할 수 없습니다.');
        onSaveModalClose();
        return;
      }
    } else {
      try {
        await dayScheduleService.updateDaySchedule(trip.no, daySchedule.no, {
          description,
          colorCode,
        });
      } catch (error) {
        alert('해당 일차 정보를 찾을 수 없습니다.');
        onSaveModalClose();
        return;
      }
    }

    alert(`여행 일차가 ${label}되었습니다.`);
    onSaveModalClose();
  };

  useEffect(() => {
    if (daySchedule) {
      setDescription(daySchedule.description);
      setColorCode(daySchedule.colorCode);
    }
  }, [daySchedule, setDescription]);

  return (
    <div className={clsx(classes.paper, classes.modal)}>
      <Grid container spacing={2} justify="center">
        <Grid className={classes.header} item xs={12}>
          <Typography variant="h6"> 일차 {label}</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            name="title"
            value={description}
            required
            label="일차 설명"
            fullWidth
            onChange={onChangeDescription}
          />
        </Grid>
        <Grid className={classes.colorGrid} item xs={10}>
          <ColorCode value={colorCode} onColorChange={handleColorChange} />
        </Grid>
      </Grid>
      <div className={classes.footerBtn}>
        <Button
          className={classes.closeBtn}
          variant="contained"
          color="secondary"
          onClick={onSaveModalClose}
        >
          닫기
        </Button>
        <Button variant="contained" color="primary" onClick={handleSaveDaySheduleClick}>
          일차 {label}
        </Button>
      </div>
    </div>
  );
}

DaySaveModalContainer.propTypes = {
  daySchedule: PropTypes.object,
  label: PropTypes.string,
  onSaveModalClose: PropTypes.func,
};

export default DaySaveModalContainer;
