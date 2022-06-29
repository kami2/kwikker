import React from 'react';
import axiosInstance from '../axios';
import { currentUser } from '../helpers/login-helpers';
import { Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';


export default function FollowProfileButton(props) {
  const { id } = currentUser()
  const profile = props.pastData;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile.isfollowed) {
      axiosInstance
        .delete(`profile/${profile.id}/unfollow`)
        .then((res) => {
          console.log('unfollowed')
          props.loadData();
        })
    } else {
      axiosInstance
        .post(`profile/${profile.id}/follow`, {
          user_id: id,
          following_user_id: profile.id
        })
        .then((res) => {
          console.log("followed")
          props.loadData();
        });
    }

  };


  return (
    <Chip onClick={handleSubmit}
      color={profile.isfollowed ? 'secondary' : 'primary'}
      size="small"
      label={profile.isfollowed ? 'Following' : 'Follow'} />
  );
}