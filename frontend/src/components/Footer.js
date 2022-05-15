import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
	footer: {
		marginTop: 10,
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
	},
}));

function Footer() {
	const classes = useStyles();

	return (
		<div className={classes.footer}>
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				Kwikker
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
		</div>
	);
}


export default Footer;