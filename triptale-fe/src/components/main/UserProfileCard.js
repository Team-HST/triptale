import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    maxWidth: 345,
    top: 100,
    right: 10,
    zIndex: 2,
  },
  media: {
    height: 140,
  },
});

/**
 * @author hoons
 * @email dudgns0612@gmail.com
 * @create date 2021-02-20 17:35:14
 * @modify date 2021-02-20 17:35:14
 * @desc [유저 정보 카드 컴포넌트]
 */
function UserProfileCard({ user }) {
  const classes = useStyles();
  const history = useHistory();

  const onLogOutClick = () => {
    sessionStorage.clear();
    history.push('/login');
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={user.profileImageUrl}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.nickname}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.email}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onLogOutClick}>
          로그아웃
        </Button>
      </CardActions>
    </Card>
  );
}

UserProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserProfileCard;
