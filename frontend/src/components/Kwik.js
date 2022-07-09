import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KwikElement } from './KwikElement';
import { CreateKwik } from './CreateKwik';

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


	if (!kwiks || kwiks.length === 0) return (
		<>
			<CreateKwik forSubmit={props.reLoad} />
			<p>Can not find any kwiks, sorry</p>
		</>
	);
	return (
		<div>
			<CreateKwik forSubmit={props.reLoad} />
			<Container maxWidth="md" component="main">
				<Grid container justifyContent="center" spacing={2} className={classes.root}>
					{kwiks.map((kwik) => {
						return (
							<KwikElement
								key={kwik.id}
								kwik={kwik}
								reLoad={props.reLoad} />
						);
					})}
				</Grid>
			</Container>
		</div>
	);
};
export default Kwiks;