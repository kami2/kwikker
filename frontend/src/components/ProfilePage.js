import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axios';
import FollowProfile from './FollowProfile';
import { currentUser, isLoggedIn } from '../helpers/login-helpers';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Layout from './Layout';
import { Grid } from '@material-ui/core';





const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 10,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    profile: {
        color: '#2c7a94',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    avatar: {
        backgroundColor: red[500],
    },
    about: {
        wordWrap: "break-word",
    }
}));

export default function ProfilePage() {
    const classes = useStyles();

    const user = currentUser();
    
    const { id } = useParams();
    const [data, setData] = useState({ user: [] });

    const loadData = React.useCallback(() => {
        axiosInstance.get(`profile/${id}`).then((res) => {
            setData({ user: res.data });
            console.log(res.data);
        });
    }, [id])

    const isFollowIconVisible = isLoggedIn()&& user.id !== id


    useEffect(() => {
        loadData()
    }, [loadData]);


    return (
        <Layout>
        <Grid container justifyContent="center" spacing={2} className={classes.root}>
            <Grid item>
        <Card variant="outlined">
            <CardHeader className={classes.profile}
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        <img src={data.user.avatar} alt="avatar" />
                    </Avatar>
                }
                action={isFollowIconVisible && <FollowProfile loadData={loadData} isFollowed={data.user.isfollowed} followThis={id} />}
                title={data.user.user_name}
                subheader={data.user.start_date}
            />
            <CardMedia
                className={classes.media}
                image="https://source.unsplash.com/random"
                title="Paella dish"
            />
            <CardContent>
                <Typography className={classes.about} variant="body2" color="textSecondary" component="p">
                    {data.user.about}
                </Typography>
            </CardContent>
        </Card>
        </Grid>
        </Grid>
        </Layout>
    );
}