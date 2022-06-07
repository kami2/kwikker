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





const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        marginTop: 20,
        margin: '0 auto',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
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
        <Card className={classes.root}>
            <CardHeader
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
                <Typography variant="body2" color="textSecondary" component="p">
                    {data.user.about}
                </Typography>
            </CardContent>
        </Card>
        </Layout>
    );
}