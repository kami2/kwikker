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
    const { id } = currentUser();

    return (
        <Grid item>
            <Card variant="outlined">
                <CardHeader className={classes.kwikTitle}
                    avatar={<Link to={`/profile/${props.kwik.user}`}>
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            <img src={props.kwik.avatar} alt="avatar" />
                        </Avatar>
                    </Link>
                    }
                    title={<Link to={`/profile/${props.kwik.user}`} className={classes.link}>{props.kwik.user_name}</Link>}
                    subheader={props.kwik.kwik_date}
                    action={String(id) === String(props.kwik.user) &&
                        <DeleteKwik reFresh={props.reLoad} toDelete={props.kwik.id} />}
                />
                <Link to={`/kwik/${props.kwik.id}`}>
                    <CardMedia
                        className={classes.image}
                        image={`https://picsum.photos/seed/${props.kwik.id}/600/150`}
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
                        {props.kwik.content}
                    </Typography>
                    <div className={classes.buttons}>
                        <div className={classes.likes_counter}>
                            <LikeKwik reLoad={props.reLoad} likeThis={props.kwik.id} isLiked={props.kwik.is_liked} />
                            Likes ({props.kwik.countedlikes})
                        </div>
                        <Typography>
                            <Link to={`/kwik/${props.kwik.id}`} className={classes.link_comment}>Comments ({props.kwik.countedcomments})</Link>
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};