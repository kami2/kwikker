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


export default function FollowersList(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const [data, setData] = useState({ following: [] });

    const loadData = React.useCallback(() => {
        axiosInstance.get(`profile/${props.id}/followers`).then((res) => {
            setData({ following: res.data });
        });
    }, [props.id])

    useEffect(() => {
        loadData()
    }, [loadData]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className={classes.root}>
            <Chip size="small" avatar={<Avatar>{props.followers}</Avatar>} label="Followers" onClick={handleClick} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div >
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