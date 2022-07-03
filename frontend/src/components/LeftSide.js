import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { currentUser } from '../helpers/login-helpers';
import Grid from '@material-ui/core/Grid';

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(3),
    },

  },
}));

export function LeftSide() {
  const classes = useStyles();
  const { id } = currentUser();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        alignItems="flex-start">
        <Button size='large' startIcon={<HomeOutlinedIcon />} href='/home'>Home</Button>
        <Button size='large' startIcon={<PersonOutlineIcon />} href={`/profile/${id}`}>Profile</Button>
        <Button size='large' startIcon={<GroupAddOutlinedIcon />} href='/users'>Kwikkers</Button>
        <Button size='large' startIcon={<SettingsOutlinedIcon />} href='/edit'>Edit Profile</Button>
        <Button size='large' startIcon={<MeetingRoomOutlinedIcon />} href='/logout'>Logout</Button>
      </Grid>
    </div>
  );
}