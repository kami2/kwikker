import React from 'react';
import axiosInstance from '../axios';
import { currentUser } from '../helpers/login-helpers';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(-2),
    },
  },
}));

export function LikeKwik(props) {
  const classes = useStyles();

  const {id} = currentUser()



  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.isLiked) {
      axiosInstance
      .delete(`kwik/${props.likeThis}/unlike/`)
      .then((res) => {
        console.log('unliked')
        props.loadData();
      })
    } else {
      axiosInstance
      .post(`kwik/${props.likeThis}/like/`, {
        user: id,
        kwik: props.likeThis,
      })
      .then((res) => {
        console.log("liked")
        props.loadData();
      });
    }
    
  };


  return (
    <div className={classes.root}>
        <IconButton onClick={handleSubmit} color={ props.isLiked ? 'primary': 'default'} type="submit" aria-label="like">
          <ThumbUpTwoToneIcon />
        </IconButton>
    </div>
  );
}