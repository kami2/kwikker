import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import { AddComment } from './AddComment';
import { isLoggedIn } from '../helpers/login-helpers';
import { Link } from 'react-router-dom';

//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import { TimelineOppositeContent } from '@material-ui/lab';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';


import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import { DeleteKwik } from './DeleteKwik';
import { LikeKwik } from './LikeKwik';



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
	addcomment: {
		textAlign: 'center',
	},
	comment_author: {
		marginTop: -11,
		marginLeft: -7,
	},
	comment_content: {
		marginTop: -4,
		marginLeft: -7,
		marginBottom: 10,
		overflowWrap: 'anywhere',
	},
	separator: {
	}
}));

export default function Single(props) {
	const { id } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ kwiks: [] });

	const loadData = React.useCallback(() => {
		axiosInstance.get(`kwik/${id}`).then((res) => {
			setData({ kwiks: res.data });
			console.log(res.data);
		});
	}, [id])

	useEffect(() => {
		loadData()
	}, [loadData]);

	return (
		<Container maxWidth="md" component="main">
			<Grid container justifyContent="center" spacing={2} className={classes.root}>
				<Grid item xs={7} md={7}>
					<Card>
						<CardHeader className={classes.kwikTitle}
							avatar={<Link to={`/profile/${data.kwiks.user}`}>
								<Avatar aria-label="recipe" className={classes.avatar}>
									<img src='https://picsum.photos/200' alt="avatar" />
								</Avatar>
							</Link>
							}
							title={<Link to={`/profile/${data.kwiks.user}`} className={classes.link}>{data.kwiks.user_name}</Link>}
							subheader={data.kwiks.kwik_date}
							action={String(id) === String(data.kwiks.user) ?
								<DeleteKwik reFresh={props.reLoad} toDelete={data.kwiks.id} />
								: <LikeKwik />}
						/>
						<Link to={`/kwik/${data.kwiks.id}`}>
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
								{data.kwiks.content}
							</Typography>

						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<div className={classes.addcomment}>
				{isLoggedIn() ? <AddComment load={loadData} kwikId={id} /> : null}
			</div>

			<Grid container justifyContent="center" spacing={2}>
				<Grid item xs={7} md={7}>
					<Card className={classes.comments}>
						<CardContent>
							<Typography variant="h6">Comments</Typography>
							<Timeline>
								{data.kwiks.comment?.map((kwik, i, { length }) => {
									return (
										<TimelineItem key={kwik.id}>
											<TimelineOppositeContent style={{ display: 'none' }} />
											<TimelineSeparator className={classes.separator}>
												<Avatar aria-label="recipe">
													<img src='https://picsum.photos/200' alt="avatar" />
												</Avatar>
												{length - 1 === i ? null : <TimelineConnector />}
											</TimelineSeparator>
											<TimelineContent>
												<Typography variant="subtitle1" className={classes.comment_author}>
													{i + 1}#  {kwik.user_name} - {kwik.comment_date}
												</Typography>
												<Typography variant="subtitle2" display="block" className={classes.comment_content}>
													{kwik.comment}
												</Typography>
											</TimelineContent>
										</TimelineItem>
									);
								})}
							</Timeline>
						</CardContent>
					</Card>
				</Grid>
			</Grid>



		</Container>
	);
}