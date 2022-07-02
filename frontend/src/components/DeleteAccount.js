import React from 'react';
import axiosInstance from '../axios';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
}));


export function DeleteAccount(props) {
    const classes = useStyles();


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('deleting')
        // axiosInstance
        //     .delete(`profile/edit/${props.toDelete}/`)
        //     .then((res) => {
        //         props.loadData();
        //     });
    };


    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleSubmit}
            >
                Delete Account
            </Button>
        </div>
    );
}