import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import { AddComment } from './AddComment';
import { currentUser } from '../helpers/login-helpers';
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

import { DeleteSingleKwik } from './DeleteSingleKwik';
import { LikeKwik } from './LikeKwik';
import { DeleteComment } from './DeleteComment';
import Layout from './Layout';




const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 10,
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
		marginTop: -8,
	},
	kwikText: {
		justifyContent: 'left',
		fontSize: '14px',
		textAlign: 'left',
		wordWrap: "break-word",
		marginBottom: -10,
	},
	comment_header: {
		marginTop: -11,
	},
	comment_author: {
		fontWeight: 'bold',
	},
	comment_date: {
		fontFamily: 'Trebuchet MS',
		fontSize: 14,
	},
	comment_content: {
		marginTop: -4,
		marginBottom: 10,
		overflowWrap: 'anywhere',
		lineHeight: '16px',
	},
	comments: {
		paddingTop: 5,
		paddingLeft: 10,
		paddingBottom: 0,
	},
	be_first: {
		textAlign: "center",
		paddingTop: 10,
	},
	buttons: {
		marginTop: 12,
		display: 'flex',
		alignItems: 'center',
		marginBottom: -15,
		justifyContent: 'space-between'
	},
	likes_counter: {
		fontSize: '13px',
	},
}));

export default function Single(props) {

	const { id } = useParams();
	const classes = useStyles();
	const user = currentUser();

	const [data, setData] = useState({ kwiks: [] });

	const loadData = React.useCallback(() => {
		axiosInstance.get(`kwik/${id}`).then((res) => {
			setData({ kwiks: res.data });
		});
	}, [id])

	useEffect(() => {
		loadData()
	}, [loadData]);

	return (
		<Layout>
			<Container component="main">
				<Grid container justifyContent="center" className={classes.root}>
					<Grid item xs={12}>
						<Card variant="outlined">
							<CardHeader className={classes.kwikTitle}
								avatar={<Link to={`/profile/${data.kwiks.user}`}>
									<Avatar aria-label="recipe" className={classes.avatar}>
										<img src={data.kwiks.avatar} alt="avatar" />
									</Avatar>
								</Link>
								}
								title={<Link to={`/profile/${data.kwiks.user}`} className={classes.link}>{data.kwiks.user_name}</Link>}
								subheader={data.kwiks.kwik_date}
								action={String(user.id) === String(data.kwiks.user) &&
									<DeleteSingleKwik toDelete={data.kwiks.id} />}
							/>
							<Link to={`/kwik/${data.kwiks.id}`}>
								<CardMedia
									className={classes.image}
									image={`https://picsum.photos/seed/${data.kwiks.id}/600/150`}
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
								<div className={classes.buttons}>
									<div className={classes.likes_counter}>
										<LikeKwik reLoad={loadData} likeThis={data.kwiks.id} isLiked={data.kwiks.is_liked} />
										Likes ({data.kwiks.countedlikes})
									</div>
								</div>
							</CardContent>
						</Card>
					</Grid>
				</Grid>

				<div className={classes.addcomment}>
					<AddComment load={loadData} kwikId={id} />
				</div>

				<Grid container justifyContent="center">
					<Grid item xs={12}>
						<Card className={classes.comments}>
							<Typography variant="h6">Comments ({data.kwiks.countedcomments})</Typography>
							{data.kwiks.comment?.length === 0 &&
								<Typography className={classes.be_first}>Be the first to comment</Typography>}
							<Timeline>
								{data.kwiks.comment?.map((kwik, i, { length }) => {
									return (
										<TimelineItem key={kwik.id}>
											<TimelineOppositeContent style={{ display: 'none' }} />
											<TimelineSeparator>
												<Avatar>
													<img src={kwik.avatar} alt="avatar" />
												</Avatar>
												{length - 1 === i ? null : <TimelineConnector />}
											</TimelineSeparator>
											<TimelineContent>
												<Typography variant="subtitle1" className={classes.comment_header}>
													<Typography display="inline" className={classes.comment_author}>
														<Link to={`/profile/${kwik.user}`} className={classes.link}>{kwik.user_name}</Link>
													</Typography> - <Typography display="inline" className={classes.comment_date}>{kwik.comment_date}
														{String(user.id) === String(kwik.user) && <DeleteComment reFresh={loadData} toDelete={kwik.id} />}
													</Typography>
												</Typography>
												<Typography variant="caption" display="block" className={classes.comment_content}>
													{kwik.comment}
												</Typography>
											</TimelineContent>
										</TimelineItem>
									);
								})}
							</Timeline>
						</Card>
					</Grid>
				</Grid>



			</Container>
		</Layout>
	);
}