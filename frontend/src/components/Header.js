import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { isLoggedIn } from '../helpers/login-helpers';
import { LogoutButton } from './Buttons';

import { Link } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 5,
		textAlign: 'center',
	},
	logout: {
		display: "flex",
		textAlign: "left",
	},
}));

const logo = '/logo_3.png';

export default function Header() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container direction="row"
				justifyContent="center"
				alignItems="flex-start">

				<Grid item xs className={classes.home}>
				</Grid>

				<Grid item xs>
					<Link to="/"><img src={process.env.PUBLIC_URL + logo} alt="Logo" /></Link>
				</Grid>

				<Grid item xs className={classes.logout}>
					{isLoggedIn() ? <LogoutButton /> : null}
				</Grid>

			</Grid>
		</div>
	);
}
