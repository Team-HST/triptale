import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 350,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2020-11-06 00:12:25
 * @modify date 2020-11-06 00:12:25
 * @desc [검색 박스 컴포넌트]
 */
function SearchBox({
  searchNm,
  handlerSearchNmChange,
  handleSearchInputKeyDwon,
  handleSearchClick,
}) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        value={searchNm}
        onChange={(e) => handlerSearchNmChange(e)}
        onKeyDown={(e) => handleSearchInputKeyDwon(e)}
        placeholder="Search Your Trip"
      />
      <IconButton className={classes.iconButton} onClick={handleSearchClick} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

SearchBox.propTypes = {
  searchNm: PropTypes.string,
  handlerSearchNmChange: PropTypes.func,
  handleSearchInputKeyDwon: PropTypes.func,
  handleSearchClick: PropTypes.func,
};

export default SearchBox;
