import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KwikElement } from './KwikElement';
import { currentUser } from '../helpers/login-helpers';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';




const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 10
	},
}));

const Kwiks = (props) => {

	const { kwiks } = props;
	const classes = useStyles();
	const { id } = currentUser();


	if (!kwiks || kwiks.length === 0) return <p>Can not find any kwiks, sorry</p>;
	return (
		<Container maxWidth="md" component="main">
			<Grid container justifyContent="center" spacing={2} className={classes.root}>
				{kwiks.map((kwik) => {
					return (
						<KwikElement
							key={kwik.id}
							logged_user={id}
							id={kwik.id}
							user={kwik.user}
							avatar={kwik.avatar}
							user_name={kwik.user_name}
							kwik_date={kwik.kwik_date}
							content={kwik.content}
							is_liked={kwik.is_liked}
							reLoad={props.reLoad} />
					);
				})}
			</Grid>
		</Container>
	);
};
export default Kwiks;