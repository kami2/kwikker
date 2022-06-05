import React from 'react';
import axiosInstance from '../axios';


import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';




export function DeleteComment(props) {


    const handleSubmit = (event) => {
        event.preventDefault();

        axiosInstance
            .delete(`kwik/delete/comment/${props.toDelete}/`)
            .then((res) => {
                props.reFresh();
            });
    };


    return (
        <IconButton onClick={handleSubmit} type="submit" aria-label="delete">
            <DeleteForeverOutlinedIcon   style={{fontSize: 20}} />
        </IconButton>
    );
}