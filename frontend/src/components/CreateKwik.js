import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

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
		margin: theme.spacing(3, 0, 2),
      },
    },
  }));


export function CreateKwik() {
    const navigate = useNavigate();
    const classes = useStyles();
    
    const [formData, updateFormData] = useState('');

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
				content: formData.content
			})
			.then((res) => {
				navigate('/');
			});
    };
    

	return (
        <form className={classes.root} noValidate autoComplete="off">
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
            onClick={handleSubmit}
            />
        </div>
        </form>
	);
}