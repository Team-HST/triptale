import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import { userService } from 'lib/axios/services';

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

function SearchBox({ searchNm, handlerSearchNmChange, handleSearchClick }) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        value={searchNm}
        onChange={(e) => handlerSearchNmChange(e)}
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
  handleSearchClick: PropTypes.func,
};

export default SearchBox;
