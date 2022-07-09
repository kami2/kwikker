import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axiosInstance from '../axios';
import Popover from '@material-ui/core/Popover';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    list: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: "center",
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
    username: {
        textDecoration: 'none',
        color: '#2c7a94',
        fontWeight: 'bold',
        fontSize: '13px',
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: 6,
    },
}));


export default function FollowingList(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const [data, setData] = useState({ following: [] });

    const loadData = () => {
        axiosInstance.get(`profile/${props.id}/following`)
            .then((res) => {
                setData({ following: res.data });
            });
    }

    useEffect(loadData, [props.id, setData]);


    const handleClick = (event) => {
        data.following.length > 0 ? setAnchorEl(event.currentTarget) : console.log('Nobody is followed');
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={classes.root}>
            <Chip size="small" avatar={<Avatar>{props.following}</Avatar>} label="Following" onClick={handleClick} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <div>
                    {data.following.map((list) => {
                        return (
                            <Link key={list.id} style={{
                                textDecoration: 'none'
                            }} to={`/profile/${list.id}`}>
                                <div onClick={handleClose} className={classes.list}><Avatar alt="avatar" className={classes.small} src={list.avatar} />
                                    <div className={classes.username}>{list.user_name}</div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </Popover>
        </div>
    );
}