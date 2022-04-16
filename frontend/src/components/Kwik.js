import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { DeleteKwik } from './DeleteKwik';

import axiosInstance from '../axios';
import jwt_decode from 'jwt-decode'


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	kwikTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	kwikText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

const Kwiks = (props) => {

	const { kwiks } = props;
	const classes = useStyles();
	const token = localStorage.getItem('access_token')
	const getUserName = jwt_decode(token)



	if (!kwiks || kwiks.length === 0) return <p>Can not find any kwiks, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container justifyContent="center" spacing={4} alignItems="center">
					{kwiks.map((kwik) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={kwik.id} xs={8} md={8}>
								<Card className={classes.card}>
									<Link to={`/${kwik.id}`}>
										<CardMedia
											className={classes.cardMedia}
											image="https://source.unsplash.com/random"
											title="Image title"
										/>
									</Link>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.kwikTitle}
										>
											{kwik.content}
										</Typography>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.kwikTitle}
										>
											{kwik.user_name}
										</Typography>
										{getUserName.user_id === kwik.user ?
											<div className={classes.kwikText}>
												<DeleteKwik reFresh={props.reLoad} toDelete={kwik.id} />
											</div>: ""}
									</CardContent>
								</Card>
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</React.Fragment>
	);
};
export default Kwiks;