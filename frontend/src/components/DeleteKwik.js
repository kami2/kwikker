import React from 'react';
import axiosInstance from '../axios';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));


export function DeleteKwik(props) {
    const classes = useStyles();

    
    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .delete(`kwik/delete/${props.toDelete}/`)
            .then((res) => {
                props.reFresh(); 
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