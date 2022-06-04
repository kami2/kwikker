import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { DeleteKwik } from './DeleteKwik';
import { LikeKwik } from './LikeKwik';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles((theme) => ({
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
    link_comment: {
        textDecoration: "none",
        fontSize: '13px',
        color: '#3b3e42',
    },
    likes_counter: {
        fontSize: '13px',
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
    buttons: {
        marginTop: 12,
        display: 'flex',
        alignItems: 'center',
        marginBottom: -15,
        justifyContent: 'space-between'
    },
}));



export function KwikElement(props) {
    const classes = useStyles();

    return (
        <Grid item xs={7} md={7}>
            <Card>
                <CardHeader className={classes.kwikTitle}
                    avatar={<Link to={`/profile/${props.user}`}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <img src={props.avatar} alt="avatar" />
                        </Avatar>
                    </Link>
                    }
                    title={<Link to={`/profile/${props.user}`} className={classes.link}>{props.user_name}</Link>}
                    subheader={props.kwik_date}
                    action={String(props.logged_user) === String(props.user) &&
                        <DeleteKwik reFresh={props.reLoad} toDelete={props.id} />}
                />
                <Link to={`/kwik/${props.id}`}>
                    <CardMedia
                        className={classes.image}
                        image={`https://picsum.photos/seed/${props.id}/600/150`}
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
                        {props.content}
                    </Typography>
                    <div className={classes.buttons}>
                        <div className={classes.likes_counter}>
                            <LikeKwik reLoad={props.reLoad} likeThis={props.id} isLiked={props.is_liked} />
                            Likes ({props.countedlikes})
                        </div>
                        <Typography>
                            <Link to={`/kwik/${props.id}`} className={classes.link_comment}>Comments ({props.countedcomments})</Link>
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};