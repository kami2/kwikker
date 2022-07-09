import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { currentUser } from '../helpers/login-helpers';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

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
  link: {
    textDecoration: 'none',
  }
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
        <Link to='/home' className={classes.link}><Button size='large' startIcon={<HomeOutlinedIcon />} >Home</Button></Link>
        <Link to={`/profile/${id}`} className={classes.link}><Button size='large' startIcon={<PersonOutlineIcon />}>Profile</Button></Link>
        <Link to='/users' className={classes.link}><Button size='large' startIcon={<GroupAddOutlinedIcon />}>Kwikkers</Button></Link>
        <Link to='/edit' className={classes.link}><Button size='large' startIcon={<SettingsOutlinedIcon />}>Edit Profile</Button></Link>
        <Link to='/logout' className={classes.link}><Button size='large' startIcon={<MeetingRoomOutlinedIcon />}>Logout</Button></Link>
      </Grid>
    </div>
  );
}