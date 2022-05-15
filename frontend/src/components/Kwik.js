import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { DeleteKwik } from './DeleteKwik';

import { currentUser, isLoggedIn } from '../helpers/login-helpers';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 10
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	image: {
		height: 150,
	},
	kwikTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	kwikText: {
		justifyContent: 'left',
		fontSize: '16px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Kwiks = (props) => {

	const { kwiks } = props;
	const classes = useStyles();
	const { id } = currentUser();



	if (!kwiks || kwiks.length === 0) return <p>Can not find any kwiks, sorry</p>;
	return (
		<Container maxWidth="md" component="main">
			<Grid container justifyContent="center" spacing={1} className={classes.root}>
				{kwiks.map((kwik) => {
					return (
						// Enterprise card is full width at sm breakpoint
						<Grid item key={kwik.id} xs={7} md={7}>
							<Card className={classes.card}>
								<CardHeader className={classes.kwikTitle}
									avatar={
										<Avatar aria-label="recipe" className={classes.avatar}>
											<img src='https://picsum.photos/200' />
										</Avatar>
									}
									action={String(id) === String(kwik.user) ?
										<DeleteKwik reFresh={props.reLoad} toDelete={kwik.id} />
										: null}
									title={kwik.user_name}
									subheader={kwik.kwik_date}
								/>
								<Link to={`kwik/${kwik.id}`}>
									<CardMedia
										className={classes.image}
										image="https://source.unsplash.com/random"
										title="Image title"
									/>
								</Link>
								<CardContent className={classes.cardContent}>
									<Typography
										gutterBottom
										variant="h6"
										component="h2"
										className={classes.kwikText}
									>
										{kwik.content}
									</Typography>
									<Typography
										gutterBottom
										variant="h6"
										component="h2"
										className={classes.kwikTitle}
									>
										<Link to={`profile/${kwik.user}`}>{kwik.user_name}</Link>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};
export default Kwiks;