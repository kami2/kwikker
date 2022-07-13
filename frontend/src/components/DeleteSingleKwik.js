import React from 'react';
import axiosInstance from '../axios';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(0),
    },
}));


export function DeleteSingleKwik(props) {
    const classes = useStyles();
    const navigate = useNavigate();

    
    const handleSubmit = (event) => {
        event.preventDefault();

        axiosInstance
            .delete(`kwik/delete/${props.toDelete}/`)
            .then((res) => {
                navigate('/home');
            });
    };


    return (
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            <div>
                <IconButton type="submit" aria-label="delete" className={classes.margin}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </form>
    );
}