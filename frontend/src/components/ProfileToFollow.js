import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import Layout from "./Layout";
import axiosInstance from "../axios";

import { Grid, Typography } from "@material-ui/core";
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Link from "@material-ui/core/Link";




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: 20,
    },
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
    username: {
        textTransform: "none",
        textDecoration: "none",
        color: '#2c7a94',
        fontWeight: 'bold',
        fontSize: '14px',
        marginLeft: 5,
        marginRight: 5,
    },
    followed: {
        float: 'right',
    },
    link: {
        textTransform: "none",
        textDecoration: "none",
    },
    inpaper: {
        display: 'flex',
    },
    about: {
        wordWrap: "break-word",
    }
}));


export default function ProfileToFollow(props) {
    const classes = useStyles();

    const [profile, setProfileState] = useState({ profiles: [] });

    const loadData = () => {
        axiosInstance.get('/users/tofollow')
            .then((res) => {
                console.log(res.data)
                setProfileState({ profiles: res.data });
            }).catch((error) => { console.log(error) });

    }

    useEffect(loadData, [setProfileState]);


    return (
        <Layout>
            <div className={classes.root}>
                <Grid
                    container
                    spacing={1}
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >{profile.profiles.map((profile) => {
                    return (
                        <Grid item key={profile.id} xs>
                            <Link underline="none" href={`/profile/${profile.id}`}>
                            <Paper className={classes.paper} variant="outlined">
                                <div className={classes.inpaper}>
                                <Avatar variant="rounded" alt="avatar" src={profile.avatar} />
                                <Typography className={classes.username}>{profile.user_name}</Typography>
                                <Typography variant='subtitle2'>Joined - {profile.start_date}</Typography>
                                <Typography className={classes.followed}>{profile.isfollowed ? 'followed' : null}</Typography>
                                </div>
                                
                                
                                <Typography variant='body2' display="block" className={classes.about}>{profile.about}</Typography>
                                
                            </Paper>
                            </Link>
                        </Grid>
                    );
                })}

                </Grid>
            </div>
        </Layout>
    )
}