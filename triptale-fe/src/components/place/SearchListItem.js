import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingBottom: '0px',
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  placeImg: {
    width: 110,
    height: 70,
    [theme.breakpoints.down('xs')]: {
      width: 80,
    },
    marginRight: 10,
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-02-03 23:50:47
 * @modify date 2021-02-03 23:50:47
 * @desc [검색 장소 정보 컴포넌트]
 */
function SearchListItem({ place, img, onItemClick }) {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItem} button onClick={() => onItemClick(place)}>
      <div>
        {img ? (
          <img className={classes.placeImg} alt={img} src={img} />
        ) : (
          <img
            className={classes.placeImg}
            alt={'기본 이미지'}
            src={require('styles/images/no-image.png')}
          />
        )}
      </div>
      <ListItemText
        primary={place.place_name}
        secondary={
          <>
            {place.address_name} <br /> {place.category_name}
          </>
        }
      />
    </ListItem>
  );
}

SearchListItem.propTypes = {
  place: PropTypes.shape({
    place_name: PropTypes.string,
    address_name: PropTypes.string,
    category_name: PropTypes.string,
  }).isRequired,
  img: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
};

export default SearchListItem;
