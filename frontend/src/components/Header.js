import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: 5,
		textAlign: 'center',
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
				<Grid item xs>
					<Link to="/home"><img src={process.env.PUBLIC_URL + logo} alt="Logo" /></Link>
				</Grid>
			</Grid>
		</div>
	);
}
