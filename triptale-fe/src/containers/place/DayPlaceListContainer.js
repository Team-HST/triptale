import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 20,
    left: 10,
    bottom: 10,
    zIndex: 10,
    height: '80%',
    [theme.breakpoints.down('md')]: {
      width: '35%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
    width: '25%',
    overflow: 'auto',
  },
  list: {
    backgroundColor: 'white',
    opacity: 0.9,
  },
  placeImg: {
    width: 120,
    height: 100,
    marginRight: 10,
  },
  divider: {
    height: 8,
  },
  inline: {
    display: 'inline',
  },
}));

function DayScheduleListContainer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        <ListItem alignItems="flex-start">
          <div>
            <img
              className={classes.placeImg}
              alt="Remy Sharp"
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
            />
          </div>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
        <Divider className={classes.divider} light={true} />
        <ListItem alignItems="flex-start">
          <div>
            <img
              className={classes.placeImg}
              alt="Remy Sharp"
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
            />
          </div>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
        <Divider className={classes.divider} light={true} />
        <ListItem alignItems="flex-start">
          <div>
            <img
              className={classes.placeImg}
              alt="Remy Sharp"
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
            />
          </div>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
        <Divider className={classes.divider} light={true} />
        <ListItem alignItems="flex-start">
          <div>
            <img
              className={classes.placeImg}
              alt="Remy Sharp"
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
            />
          </div>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
        <Divider className={classes.divider} light={true} />
        <ListItem alignItems="flex-start">
          <div>
            <img
              className={classes.placeImg}
              alt="Remy Sharp"
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
            />
          </div>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
        <Divider className={classes.divider} light={true} />
        <ListItem alignItems="flex-start">
          <div>
            <img
              className={classes.placeImg}
              alt="Remy Sharp"
              src="https://homepages.cae.wisc.edu/~ece533/images/airplane.png"
            />
          </div>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItem>
      </List>
    </div>
  );
}

export default DayScheduleListContainer;
