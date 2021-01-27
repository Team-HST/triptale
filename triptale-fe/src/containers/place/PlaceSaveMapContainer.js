import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Map from 'components/kakaoMap/Map';
import http from 'lib/axios/http';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    height: '200px',
    overflow: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  placeImg: {
    width: 110,
    height: 70,
    marginRight: 10,
  },
  listItem: {
    paddingBottom: '0px',
  },
  map: {
    height: '30vh',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-16 19:14:52
 * @modify date 2021-01-21 22:04:27
 * @desc [일차 별 장소 지도 등록 컴포넌트]
 */
function PlaceSaveMapContainer() {
  useEffect(() => {
    const testAPI = async () => {
      const apiKey = 'a6a97e95b84c218b23e293b7d6f8d6d6';
      const response = await http.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=신림 뜨랑블루`,
        {
          headers: {
            Authorization: `KakaoAK ${apiKey}`,
          },
        },
      );
      console.log(response);
    };

    testAPI();
  }, []);
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        장소검색
      </Typography>
      <Input
        id="map-search"
        type="text"
        placeholder="장소를 검색하여주세요."
        fullWidth
        // value={values.password}
        // onChange={handleChange('password')}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="map search"
              // onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <List className={classes.root} disablePadding={true}>
        {[0, 1, 2, 3].map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value} className={classes.listItem} button>
              <div>
                <img
                  className={classes.placeImg}
                  // alt={place.thumbnailUrl}
                  src={require('styles/images/no-image.png')}
                />
              </div>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItem>
          );
        })}
      </List>
      <Map
        className={classes.map}
        options={{
          mapId: 'placeSaveMap',
          center: [33.450701, 126.570667],
          level: 8,
        }}
      />
    </>
  );
}

export default PlaceSaveMapContainer;
