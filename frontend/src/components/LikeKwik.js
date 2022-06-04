import React from 'react';
import axiosInstance from '../axios';
import { currentUser } from '../helpers/login-helpers';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpTwoToneIcon from '@material-ui/icons/ThumbUpTwoTone';


export function LikeKwik(props) {
  
  const {id} = currentUser();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.isLiked) {
      axiosInstance
      .delete(`kwik/${props.likeThis}/unlike/`)
      .then((res) => {
        console.log('unliked')
        props.reLoad();
      })
    } else {
      axiosInstance
      .post(`kwik/${props.likeThis}/like/`, {
        user: id,
        kwik: props.likeThis,
      })
      .then((res) => {
        console.log("liked")
        props.reLoad();
      });
    }
    
  };


  return (
        <IconButton onClick={handleSubmit} color={ props.isLiked ? 'primary': 'default'} type="submit" aria-label="like">
          <ThumbUpTwoToneIcon />
        </IconButton>
  );
}