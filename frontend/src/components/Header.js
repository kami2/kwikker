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
	logo: {
		flex: 1,
		width: '95%',
		height: '95%',
		resizeMode: 'cover',
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
				<Grid item xs sm={4}>
					<Link to="/home"><img src={process.env.PUBLIC_URL + logo} className={classes.logo} alt="Logo" /></Link>
				</Grid>
			</Grid>
		</div>
	);
}
