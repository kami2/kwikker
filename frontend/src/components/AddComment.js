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
            width: '57%',
        },
        button: {
            margin: theme.spacing(1),
        },
    },
}));


export function AddComment(props) {
    const classes = useStyles();
    const { id } = currentUser();

    const initialFormData = {
        kwik: props.kwikId,
        user: id,
        comment: '',
    };


    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance
            .post(`kwik/create/comment/`, {
                kwik: formData.kwik,
                user: formData.user,
                comment: formData.comment
            })
            .then((res) => {
                props.load();
                updateFormData(initialFormData);
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
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}