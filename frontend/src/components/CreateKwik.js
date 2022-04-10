import React, { useState } from 'react';
import axiosInstance from '../axios';
import jwt_decode from 'jwt-decode'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';




const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '70ch',
      },
      button: {
        margin: theme.spacing(1),
      },
    },
  }));


export function CreateKwik(props) {
    const classes = useStyles();
    const token = localStorage.getItem('access_token');
    const getUserName = jwt_decode(token)

    const initialFormData = Object.freeze({
        user: getUserName.user_id,
		content: '',
	});

    
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
			.post(`kwik/create/`, {
                user: formData.user,
                content: formData.content
			})
			.then((res) => {
				props.forSubmit();
			});
    };
    

	return (
        <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
        <div>
            <TextField
            id="outlined-multiline-static"
            label="Add Kwik"
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="outlined"
            name="content"
            onChange={handleChange}
            />
        </div>
        <div>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            >Send</Button>
        </div>
        </form>
	);
}