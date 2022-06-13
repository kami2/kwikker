import React, { useState } from 'react';
import axiosInstance from '../axios';
import { currentUser } from '../helpers/login-helpers';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import { InputAdornment } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
        button: {
            margin: theme.spacing(1),
        },
    },
}));


export function AddComment(props) {
    const classes = useStyles();
    const { id } = currentUser();


    const [comment, setComment] = useState('');

    const handleChange = (e) => {
        setComment(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(comment);

        axiosInstance
            .post(`kwik/create/comment/`, {
                kwik: props.kwikId,
                user: id,
                comment: comment,
            })
            .then((res) => {
                setComment('');
                props.load();
            });
    };


    return (
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label="Add Comment"
                    multiline
                    variant="filled"
                    name="comment"
                    inputProps={{ maxLength: 300 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type='submit' edge='end' color="primary" aria-label="add to shopping cart">
                                    <QueuePlayNextIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    value={comment}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}