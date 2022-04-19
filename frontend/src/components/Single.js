import React, { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import { useParams } from 'react-router-dom';
import { AddComment } from './AddComment';
import {isLoggedIn} from '../helpers/login-helpers';

//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function Single() {
	const { id } = useParams();
	const classes = useStyles();

	const [data, setData] = useState({ kwiks: [] });

	const loadData = React.useCallback(() => {
		axiosInstance.get(id).then((res) => {
			setData({ kwiks: res.data });
			console.log(res.data);
		});
	},[id])

	useEffect(()=> {
		loadData()
	}, [loadData]);

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}></div>
			<div className={classes.heroContent}>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						{data.kwiks.content}
					</Typography>
					<Typography
						variant="h5"
						align="center"
						color="textSecondary"
						paragraph
					>
						{data.kwiks.user}
					</Typography>
				</Container>
			</div>

			{ isLoggedIn ? <AddComment load={loadData} kwikId={id} /> : null}

			<Timeline>
				{data.kwiks.comment?.map((kwik, i, { length }) => {
						return (
							<TimelineItem key={kwik.id}>
								<TimelineSeparator>
									<TimelineDot />
								{length -1 === i ? null : <TimelineConnector />}
								</TimelineSeparator>
								<TimelineContent>{kwik.comment} BY  {kwik.user_name}</TimelineContent>
							</TimelineItem>
						);
				})}
    		</Timeline>


		</Container>
	);
}