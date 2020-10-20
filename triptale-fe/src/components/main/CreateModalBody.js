import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
      width: '40%',
    },
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  header: {
    textAlign: 'center',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
}));

function CreateModalBody() {
  const classes = useStyles();
  const modalStyle = getModalStyle();

  return (
    <div style={modalStyle} className={classes.paper}>
      <Grid container spacing={1}>
        <Grid className={classes.header} item xs={12}>
          <Typography variant="h6">Create Trip</Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateModalBody;
