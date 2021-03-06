import React, { useState, useCallback, useEffect } from 'react';
import useInput from 'hooks/useInput';
import { makeStyles } from '@material-ui/core/styles';

import ProductLayout from 'components/main/ProductLayout';
import SearchBox from 'components/common/SearchBox';
import ModalLayout from 'components/common/ModalLayout';
import UserProfileAvatar from 'components/main/UserProfileAvatar';
import UserProfileCard from 'components/main/UserProfileCard';
import TripSaveModalContainer from 'containers/main/TripSaveModalContainer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as TripActions from 'store/modules/trip';
import { useDispatch } from 'react-redux';
import userService from 'lib/axios/services/userService';

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${require('styles/images/login_banner.png')})`,
    backgroundColor: '#7fc7d9',
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
    marginTop: theme.spacing(6),
  },
  h2: {
    marginTop: theme.spacing(2),
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  searchBox: {
    marginTop: theme.spacing(10),
  },
  more: {
    marginTop: theme.spacing(6),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-05 23:52:20
 * @modify date 2020-11-05 23:52:20
 * @desc [이미지 배너 컨테이너 컴포넌트]
 */
function ImageBannerContainer() {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [searchNm, onChangeSearchNm] = useInput('');
  const [open, setOpen] = useState(false);
  const [isUserProfile, setIsUserProfile] = useState(false);
  const dispatch = useDispatch();

  const getUser = useCallback(async () => {
    const user = await userService.searchUser(sessionStorage.getItem('userNo'));
    setUser(user);
  }, []);

  // 여행 목록 조회 메서드
  const getTripList = useCallback(
    (search) => {
      dispatch(TripActions.setTripsAsync(search));
    },
    [dispatch]
  );

  // 등록 버튼 클릭 이벤트
  const handleRegisterClick = useCallback(() => {
    setOpen(true);
  }, []);

  // 등록 모달 종료 이벤트
  const handleModalCloseClick = useCallback(() => {
    setOpen(false);
    getTripList(searchNm);
  }, [getTripList, searchNm]);

  // 검색 버튼 이벤트
  const handleSearchClick = useCallback(() => {
    getTripList(searchNm);
  }, [getTripList, searchNm]);

  // 검색 인풋 엔터 이벤트
  const handleSearchInputKeyDwon = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        getTripList(searchNm);
      }
    },
    [getTripList, searchNm]
  );

  // 유저 프로필 클릭 이벤트
  const handleUserProfileClick = useCallback(() => {
    setIsUserProfile(!isUserProfile);
  }, [isUserProfile]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <ProductLayout backgroundClassName={classes.background}>
      <UserProfileAvatar user={user} onClick={handleUserProfileClick} />
      {isUserProfile && <UserProfileCard user={user} />}

      <Typography
        className={classes.h2}
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
      >
        TripTale
      </Typography>
      <Typography className={classes.h5} color="inherit" align="center" variant="h5">
        안녕하세요. TripTale에 온 것을 환영합니다. <br /> 우리는 당신의 여행을 항상 응원합니다!
      </Typography>
      <Button
        className={classes.button}
        color="secondary"
        variant="contained"
        size="large"
        onClick={handleRegisterClick}
      >
        여행 등록
      </Button>
      <div className={classes.searchBox}>
        <SearchBox
          searchNm={searchNm}
          placeholder="당신의 여행을 검색하세요."
          onSearchNmChange={onChangeSearchNm}
          onSearchInputKeyDwon={handleSearchInputKeyDwon}
          onSearchClick={handleSearchClick}
        />
      </div>
      <Typography className={classes.more} color="inherit" variant="body2">
        당신의 여행을 기록해보세요!
      </Typography>
      <ModalLayout open={open} onClose={handleModalCloseClick}>
        <TripSaveModalContainer label={'등록'} onModalCloseClick={handleModalCloseClick} />
      </ModalLayout>
    </ProductLayout>
  );
}

export default ImageBannerContainer;
