import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { DeleteKwik } from './DeleteKwik';
import { LikeKwik } from './LikeKwik';

import { currentUser } from '../helpers/login-helpers';


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
	link: {
		textDecoration: "none",
		color: '#2c7a94',
		fontWeight: 'bold',
		fontSize: '16px',
	},
	image: {
		marginTop: -8,
		height: 150,
	},
	kwikTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	kwikText: {
		justifyContent: 'left',
		fontSize: '14px',
		textAlign: 'left',
		wordWrap: "break-word",
		marginBottom: -10,
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
						// Enterprise card is full width at sm breakpoint
						<Grid item key={kwik.id} xs={7} md={7}>
							<Card className={classes.card}>
								<CardHeader className={classes.kwikTitle}
									avatar={<Link to={`/profile/${kwik.user}`}>
										<Avatar aria-label="recipe" className={classes.avatar}>
											<img src='https://picsum.photos/200' alt="avatar" />
										</Avatar>
									</Link>
									}
									title={<Link to={`/profile/${kwik.user}`} className={classes.link}>{kwik.user_name}</Link>}
									subheader={kwik.kwik_date}
									action={String(id) === String(kwik.user) &&
										<DeleteKwik reFresh={props.reLoad} toDelete={kwik.id} />}
								/>
								<Link to={`/kwik/${kwik.id}`}>
									<CardMedia
										className={classes.image}
										image="https://source.unsplash.com/random"
										alt="placeholder"
									/>
								</Link>
								<CardContent>
									<Typography
										gutterBottom
										variant="h6"
										component="h2"
										display="block"
										className={classes.kwikText}
									>
										{kwik.content}
									</Typography>
									<LikeKwik likeThis={kwik.id} isLiked={kwik.is_liked} />
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