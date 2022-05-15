import React from 'react';
import axiosInstance from '../axios';
import { currentUser } from '../helpers/login-helpers';

import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
    },
  },
}));

export function LikeKwik(props) {
  const classes = useStyles();

  const {id} = currentUser()



//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (props.isFollowed) {
//       axiosInstance
//       .delete(`profile/${props.followThis}/unfollow`)
//       .then((res) => {
//         console.log('unfollowed')
//         props.loadData();
//       })
//     } else {
//       axiosInstance
//       .post(`profile/${props.followThis}/follow`, {
//         user_id: id,
//         following_user_id: props.followThis
//       })
//       .then((res) => {
//         console.log("followed")
//         props.loadData();
//       });
//     }
    
//   };


  return (
    <div className={classes.root}>
        <IconButton color={ props.isFollowed ? 'secondary': 'default'} type="submit" aria-label="follow">
          <FavoriteIcon />
        </IconButton>
    </div>
  );
}