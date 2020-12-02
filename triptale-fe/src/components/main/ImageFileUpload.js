import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  image: {
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      height: '180px',
    },
    width: '300px',
    height: '190px',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.5),
    cursor: 'pointer',
    borderRadius: '30px',
    border: '3px solid black',
  },
  inputFile: {
    display: 'none',
  },
}));

function ImageFileUpload({ file, handleFileChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <label htmlFor="file-input">
        {file.fileSrno || file.thumbnailFile ? (
          file.fileSrno ? (
            <img
              src={`/api/system/storage/files/${file.fileSrno}`}
              className={classes.image}
              alt="여행 배너 이미지"
            ></img>
          ) : (
            <img
              src={URL.createObjectURL(file.thumbnailFile)}
              className={classes.image}
              alt="여행 배너 이미지"
            ></img>
          )
        ) : (
          <img
            src={require('styles/images/file-default.jpg')}
            className={classes.image}
            alt="여행 배너 이미지"
          ></img>
        )}
      </label>
      <input
        type="file"
        id="file-input"
        className={classes.inputFile}
        accept="image/*"
        onChange={(e) => handleFileChange(e)}
      />
    </div>
  );
}

ImageFileUpload.propTypes = {
  thumbnailFile: PropTypes.object,
  handleFileChange: PropTypes.func,
};

export default ImageFileUpload;
