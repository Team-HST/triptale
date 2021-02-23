import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      top: 10,
      right: 10,
    },
    position: 'absolute',
    top: 20,
    right: 20,
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    cursor: 'pointer',
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-02-20 17:34:51
 * @modify date 2021-02-20 17:34:51
 * @desc [유저 프로필 아바타 컴포넌트]
 */
function UserProfileAvatar({ user, onClick }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {
        <Avatar
          alt="유저프로필"
          src={user.profileImageUrl}
          className={classes.large}
          onClick={onClick}
        />
      }
    </div>
  );
}

UserProfileAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default UserProfileAvatar;
