import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { currentUser } from '../helpers/login-helpers';
import Grid from '@material-ui/core/Grid';
import axiosInstance from '../axios';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import ListIcon from '@material-ui/icons/List';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(3),
        },
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    button: {
        textTransform: "none",
        color: '#2c7a94',
        fontWeight: 'bold',
        fontSize: '14px',
    },
    link: {
        textTransform: "none",
        textDecoration: "none",
        color: '#8a8a8a',
        '&:hover': {
            color: '#2c7a94',
        },
        fontSize: '14px',
        margin: 10,
    }
}));




export function RightSide() {
    const classes = useStyles();
    const { id } = currentUser();
    const [user, setUserState] = useState({ users: [] });

    const loadData = () => {
        axiosInstance.get('users/latest')
            .then((res) => {
                setUserState({ users: res.data });
                console.log(res.data);
            }).catch((error) => { console.log(error) });
    }
    useEffect(loadData, [setUserState]);

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="column"
                alignItems="flex-start">
                <div className={classes.title}>Latest kwikkers:</div>
                {user.users.map((user) => {
                    return (
                        <Button
                            className={classes.button}
                            key={user.id}
                            startIcon={<Avatar alt="avatar" className={classes.small} src={user.avatar} />}
                            href={`/profile/${user.id}`}>{user.user_name}</Button>
                    );
                })}
                <Link to='/users' className={classes.link}>Click here for more...</Link>
            </Grid>
        </div>
    );
}