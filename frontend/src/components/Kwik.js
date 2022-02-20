import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
	console.log(kwiks)
	if (!kwiks || kwiks.length === 0) return <p>Can not find any kwiks, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main">
				<Grid container spacing={5} alignItems="flex-end">
					{kwiks.map((kwik) => {
						return (
							// Enterprise card is full width at sm breakpoint
							<Grid item key={kwik.id} xs={12} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image="https://source.unsplash.com/random"
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.kwikTitle}
										>
											{kwik.content.substr(0, 50)}...
										</Typography>
										<Typography
											gutterBottom
											variant="h6"
											component="h2"
											className={classes.kwikTitle}
										>
											{kwik.user}
										</Typography>
										<div className={classes.kwikText}>
											<Typography
												component="p"
												color="textPrimary"
											></Typography>
										</div>
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