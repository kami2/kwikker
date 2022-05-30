import React, { useState } from 'react';
import axiosInstance from '../axios';
import jwt_decode from 'jwt-decode'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import { InputAdornment } from '@material-ui/core';



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

  const [content, setContent] = useState('');


  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(content);

    axiosInstance
      .post(`kwik/create/`, {
        user: getUserName.user_id,
        content: content,
      })
      .then((res) => {
        setContent('');
        props.forSubmit();
      });
  };


  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-static"
          label="What's happening?"
          multiline
          variant="filled"
          name="content"
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
          value={content}
          onChange={handleChange}
        />
      </div>
    </form>
  );
}