import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ImageFileUpload from 'components/main/ImageFileUpload';
import DateUtils from 'utils/DateUtils';

import { tripService, fileService } from 'lib/axios/services';

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
    [theme.breakpoints.up('lg')]: {
      width: '50%',
    },
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(0.3),
  },
  searchIcon: {
    cursor: 'pointer',
  },
  footerBtn: {
    marginTop: theme.spacing(2),
  },
  closeBtn: {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:52:42
 * @modify date 2020-11-05 23:52:42
 * @desc [여행 등록 모달 컨테이너 컴포넌트]
 */
function CreateModalContainer({ handleModalCloseClick }) {
  const classes = useStyles();
  const modalStyle = getModalStyle();

  const [textField, setTextField] = useState({
    title: '',
    desc: '',
    materials: '',
    area: '',
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [thumbnailFile, setThumbnailFile] = useState(null);

  // 텍스트 필드 변경 이벤트
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setTextField({
      ...textField,
      [name]: value,
    });
  };

  // 시작일자 변경 이벤트
  const handleStartDateChange = (date) => {
    if (!DateUtils.getIsDayDifference(date, endDate)) {
      alert('시작 일자는 종료 일자보다 늦을 수 없습니다.');
      return;
    }

    setStartDate(date);
  };

  // 종료일자 변경이벤트
  const handleEndDateChange = (date) => {
    if (DateUtils.getIsDayDifference(date, endDate)) {
      alert('종료 일자는 시작 일자보다 빠를 수 없습니다.');
      return;
    }

    setEndDate(date);
  };

  // 목적지 검색 클릭 이벤트
  const handleSearchClick = () => {};

  // 목적지 검색 엔터 이벤트
  const handleSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSearchClick();
    }
  };

  // 파일 변경 이벤트
  const handleFileChange = (e) => {
    const thumbnailFile = e.target.files[0] ? e.target.files[0] : null;
    setThumbnailFile(thumbnailFile);
  };

  const handleCreateTripClick = async () => {
    let fileSrno = null;
    if (thumbnailFile) {
      fileSrno = await fileService.uploadFile(thumbnailFile);
    }

    await tripService.createTrip({
      userNo: sessionStorage.getItem('userNo'),
      title: textField.title,
      description: textField.desc,
      area: textField.area,
      latitude: 0,
      longitude: 0,
      thumbnailFileNo: fileSrno,
      startAt: DateUtils.getDateToStr(startDate),
      endAt: DateUtils.getDateToStr(endDate),
      materials: textField.materials,
    });

    alert('정상적으로 여행이 등록되었습니다.');
    // 팝업 종료
    handleModalCloseClick();
  };

  return (
    <div style={modalStyle} className={classes.paper}>
      <Grid container spacing={1}>
        <Grid className={classes.header} item xs={12}>
          <Typography variant="h6">TripTale! 여행 등록</Typography>
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <TextField
            className={classes.textField}
            name="title"
            required
            label="여행 제목"
            fullWidth
            onChange={(e) => handleTextChange(e)}
          />
          <TextField
            className={classes.textField}
            name="desc"
            required
            label="여행 내용"
            fullWidth
            multiline
            rows={2}
            onChange={(e) => handleTextChange(e)}
          />
          <TextField
            className={classes.textField}
            name="materials"
            required
            label="준비물"
            fullWidth
            multiline
            rows={2}
            onChange={(e) => handleTextChange(e)}
          />
          <ImageFileUpload thumbnailFile={thumbnailFile} handleFileChange={handleFileChange} />
        </Grid>
        <Grid item lg={6} sm={6} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              label="여행 시작 일자"
              format="yyyy/MM/dd"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
            <KeyboardDatePicker
              margin="normal"
              label="여행 종료 일자"
              format="yyyy/MM/dd"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              fullWidth
            />
          </MuiPickersUtilsProvider>
          <TextField
            className={classes.textField}
            name="area"
            required
            label="목적지 조회"
            fullWidth
            onChange={(e) => handleTextChange(e)}
            onKeyDown={(e) => handleSearchKeyDown(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon className={classes.searchIcon} onClick={handleSearchClick} />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <div className={classes.footerBtn}>
        <Button variant="contained" color="primary" onClick={handleCreateTripClick}>
          여행 등록
        </Button>
        <Button
          className={classes.closeBtn}
          variant="contained"
          color="primary"
          onClick={handleModalCloseClick}
        >
          닫기
        </Button>
      </div>
    </div>
  );
}

CreateModalContainer.propTypes = {
  handleModalCloseClick: PropTypes.func,
};

export default CreateModalContainer;
