import React, { useState, useEffect} from "react";
import Layout from "./Layout";
import axiosInstance from "../axios";
import { currentUser } from '../helpers/login-helpers';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Typography } from "@material-ui/core";

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { DeleteAccount } from "./DeleteAccount";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    usernameField: {
        width: '25ch',
    },
    aboutField: {
        width: '80%',
    },
    button: {
        margin: theme.spacing(1),
    },
    title: {
        color: '#5d6c85',
    },
    buttonsGroup: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));


export default function EditProfile(props) {
    const classes = useStyles();
    const {id} = currentUser();

    const [data, setData] = useState({ profile: [] });
    const [username, setUsername] = useState("")
    const [about, setAbout] = useState("")


	const loadData = React.useCallback(() => {
		axiosInstance.get(`profile/edit/${id}`).then((res) => {
			setData({ profile: res.data });
            setUsername(res.data['user_name'])
            setAbout(res.data['about'])
			console.log(res.data);
		})
	}, [id])

	useEffect(() => {
		loadData()
	}, [loadData]);
    

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleAboutChange = (e) => {
        setAbout(e.target.value);
    }
    

    const handleSubmit = (e) => {
		e.preventDefault();

		axiosInstance
			.put(`profile/edit/${id}`, {
                id: {id},
				user_name: username,
				about: about,
			})
            .then((res) => {
                loadData();
              });
	};

    if (!data || data.length === 0) return <p>Loading data</p>;
    return (
        <Layout>
            <div><Typography variant='h5' className={classes.title}>Edit Profile</Typography></div>
            <div className={classes.root}>
                <form noValidate>
                <div>
                    <TextField
                        label="Username"
                        inputProps={{ maxLength: 30 }}
                        value={username}
                        className={classes.usernameField}
                        helperText="Change your username"
                        margin="normal"
                        variant="outlined"
                        onChange={handleUsernameChange} />
                </div>

                <div>
                    <TextField
                        label="About"
                        multiline
                        rows={6}
                        inputProps={{ maxLength: 300 }}
                        value={about}
                        margin="normal"
                        className={classes.aboutField}
                        helperText="Write something about yourself"
                        variant="outlined"
                        onChange={handleAboutChange} />
                </div>

                <div className={classes.buttonsGroup}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                    <DeleteAccount loadData={loadData} toDelete={id} />
                </div>
                </form>
            </div>
        </Layout>
    )
}