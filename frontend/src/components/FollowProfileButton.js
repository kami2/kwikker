import React from 'react';
import axiosInstance from '../axios';
import { currentUser } from '../helpers/login-helpers';
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
          props.loadData();
        })
    } else {
      axiosInstance
        .post(`profile/${profile.id}/follow`, {
          user_id: id,
          following_user_id: profile.id
        })
        .then((res) => {
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