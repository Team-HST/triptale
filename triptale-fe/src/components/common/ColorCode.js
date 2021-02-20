import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CheckIcon from '@material-ui/icons/Check';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'center',
  },
  btn: {
    margin: theme.spacing(0.5),
    height: '30px',
    width: '13%',
    borderRadius: '7px !important',
  },
}));

function ColorCode({ value, onColorChange }) {
  const classes = useStyles();
  const [colorCodes, setColorCodes] = useState([
    { color: 'red', active: false },
    { color: 'orange', active: false },
    { color: 'yellow', active: false },
    { color: 'green', active: false },
    { color: 'blue', active: false },
    { color: 'navy', active: false },
    { color: 'purple', active: false },
  ]);

  useEffect(() => {
    if (value) {
      setColorCodes((state) =>
        state.map((colorCode) =>
          colorCode.color === value
            ? { ...colorCode, active: true }
            : { ...colorCode, active: false }
        )
      );
    }
  }, [value]);

  return (
    <ButtonGroup className={classes.root} aria-label="contained primary button group" fullWidth>
      {colorCodes.map((colorCode) => (
        <Button
          key={colorCode.color}
          className={classes.btn}
          variant="contained"
          style={{
            backgroundColor: colorCode.color,
          }}
          onClick={() => onColorChange(colorCode.color)}
        >
          {colorCode.active ? <CheckIcon fontSize="small" style={{ color: 'white' }} /> : ''}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default ColorCode;
