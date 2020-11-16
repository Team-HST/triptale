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

import Map from 'components/kakaoMap/Map';
import Circle from 'components/kakaoMap/Circle';
import MapUtils from 'utils/MapUtils';

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
    [theme.breakpoints.up('sm')]: {
      width: '70%',
      height: '60%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '50%',
      height: '60%',
    },
    width: '80%',
    height: '85%',
    overflow: 'auto',
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
  map: {
    height: '250px',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:52:42
 * @modify date 2020-11-05 23:52:42
 * @desc [여행 등록 모달 컨테이너 컴포넌트]
 */
function CreateModalContainer({ onModalCloseClick }) {
  const { kakao } = window;
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
  const [searchArea, setSearchArea] = useState({
    name: '',
    position: [],
  });
  const [mapOptions, setMapOptions] = useState({
    mapId: 'createMap',
    center: [33.450701, 126.570667],
    level: 8,
  });

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
  const handleSearchClick = () => {
    MapUtils.getAddressToCoords(textField.area, (result, status) => {
      let areaPosition = [];
      let areaName = '';
      // 정상적 처리
      if (status === kakao.maps.services.Status.OK) {
        areaPosition = [result[0].y, result[0].x];
        areaName = result[0].address_name;
      } else {
        alert(`${textField.area}의 위치를 찾을 수 없습니다.`);
      }
      // 마커 주소, 위치 설정 및 해당 위치 이동
      setSearchArea({
        name: areaName,
        position: areaPosition,
      });
      setMapOptions({
        ...mapOptions,
        center: areaPosition.length > 0 ? areaPosition : [33.450701, 126.570667],
      });
    });
  };

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

    const tripInfo = {
      userNo: sessionStorage.getItem('userNo'),
      title: textField.title,
      description: textField.desc,
      area: searchArea.name,
      latitude: searchArea.position[1],
      longitude: searchArea.position[0],
      thumbnailFileNo: fileSrno,
      startAt: DateUtils.getDateToStr(startDate),
      endAt: DateUtils.getDateToStr(endDate),
      materials: textField.materials,
    };

    // 여행 정보 검사 후 등록 실행
    if (isTripValideCheck(tripInfo)) {
      // 여행 등록
      await tripService.createTrip(tripInfo);
      alert('정상적으로 여행이 등록되었습니다.');
      // 팝업 종료
      onModalCloseClick();
    }
  };

  const isTripValideCheck = () => {
    let isValid = true;
    if (!textField.title) {
      alert('여행 제목을 입력하여 주세요.');
      isValid = false;
    } else if (!textField.desc) {
      alert('여행 설명을 입력하여 주세요.');
      isValid = false;
    } else if (!searchArea.name) {
      alert('여행 지역을 지정하여 주세요.');
      isValid = false;
    }

    return isValid;
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
          <Map className={classes.map} options={mapOptions}>
            {searchArea.position.length > 0 && (
              <Circle
                options={{
                  center: searchArea.position,
                  radius: 1500,
                  strokeWeight: 4,
                  strokeColor: '#2671EC',
                  strokeOpacity: 1,
                  strokeStyle: 'dashed',
                  fillColor: '#2671EC',
                  fillOpacity: 0.5,
                }}
              ></Circle>
            )}
          </Map>
        </Grid>
      </Grid>
      <div className={classes.footerBtn}>
        <Button variant="contained" color="primary" onClick={handleCreateTripClick}>
          여행 등록
        </Button>
        <Button
          className={classes.closeBtn}
          variant="contained"
          color="secondary"
          onClick={onModalCloseClick}
        >
          닫기
        </Button>
      </div>
    </div>
  );
}

CreateModalContainer.propTypes = {
  onModalCloseClick: PropTypes.func,
};

export default CreateModalContainer;
