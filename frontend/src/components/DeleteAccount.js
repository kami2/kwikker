import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';



const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(1),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


export function DeleteAccount(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        axiosInstance
            .delete(`profile/edit/${props.toDelete}`)
            .then((res) => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                axiosInstance.defaults.headers['Authorization'] = null;
                navigate('/');
            });
    };


    return (
        <div>
            <Button
                variant="contained"
                color="secondary"
                size="small"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={handleOpen}
            >
                Delete Account
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Are you sure you want to delete account?</h2>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={handleSubmit}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            onClick={handleClose}
                            className={classes.button}
                        >
                            Cancel
                        </Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}