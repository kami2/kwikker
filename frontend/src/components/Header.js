import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { currentUser, isLoggedIn } from '../helpers/login-helpers';
import { LogoutButton, HomeButton } from './Buttons';



const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 5,
		textAlign: 'center',

	},
	logout: {
		textAlign: "left",
	},
	home: {
		textAlign: 'right',
	},
}));

const logo = '/logo_3.png';
const { userName } = currentUser();

export default function Header() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container direction="row"
				justifyContent="center"
				alignItems="flex-start">

				<Grid item xs className={classes.home}>
					<HomeButton />
				</Grid>

				<Grid item xs>
					<img src={process.env.PUBLIC_URL + logo} alt="Logo" />
				</Grid>

				<Grid item xs className={classes.logout}>
					{isLoggedIn() ? <LogoutButton /> : null}
				</Grid>

			</Grid>
		</div>
	);
}
