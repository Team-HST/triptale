import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  image: {
    width: '70%',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    cursor: 'pointer',
    borderRadius: '30px',
  },
  inputFile: {
    display: 'none',
  },
}));
function ImageFileUpload() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <label htmlFor="file-input">
        <img src={require('styles/images/file-default.jpg')} className={classes.image}></img>
      </label>
      <input id="file-input" className={classes.inputFile} type="file" />
    </div>
  );
}

export default ImageFileUpload;
