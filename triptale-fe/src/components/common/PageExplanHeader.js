import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  avatar: {
    backgroundColor: 'green',
  },
  button: {
    width: '90%',
    fontSize: '12px',
    color: 'green',
    borderColor: 'green',
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-01-10 17:52:34
 * @modify date 2021-01-10 17:52:34
 * @desc [페이지 설명 컴포넌트]
 */
function PageExplanHeader({ className, explan, avatar, button, onButtonClick }) {
  const classes = useStyles();

  return (
    <Paper className={className}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item md={2}>
          <Avatar className={classes.avatar}>{avatar}</Avatar>
        </Grid>
        <Grid item md={9}>
          <Typography variant="subtitle2">{explan}</Typography>
        </Grid>
        <Grid item md={3}>
          <Button
            className={classes.button}
            size="small"
            variant="outlined"
            onClick={onButtonClick}
          >
            {button}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

PageExplanHeader.propTypes = {
  className: PropTypes.object,
  explan: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func,
};

export default PageExplanHeader;
