import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";

import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from "@material-ui/core/Link";
import { LikeKwik } from "./LikeKwik";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    paper: {
        padding: theme.spacing(1),
        backgroundColor: '#fafafa',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
    date: {
        fontWeight: 'bold',
        fontSize: 13,
        color: '#4d7787',
    },
    likes: {
        marginRight: 10,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#6095a8',
    },
    comments: {
        marginRight: 5,
        fontSize: 13,
        fontWeight: 'bold',
        color: '#6095a8',
    },
    content: {
        fontSize: 14,
    },
    sideBlock: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: "baseline",
        marginTop: -8,
    }
}));


export default function ProfileKwiks(props) {
    const classes = useStyles();
    const [data, setData] = useState({ kwiks: [] });

    const loadData = React.useCallback(() => {
        axiosInstance.get(`profile/${props.id}/kwiks`).then((res) => {
            setData({ kwiks: res.data });
            console.log(res.data);
        });
    }, [props.id])

    useEffect(() => {
        loadData()
    }, [loadData]);

    return (
        <Grid container justifyContent="center" spacing={2} className={classes.root}>
            {data.kwiks?.map((kwik) => {
                return (
                    <Grid item xs={11} key={kwik.id}>
                        <Link underline="none" href={`/kwik/${kwik.id}`}>
                            <Paper variant="outlined" className={classes.paper}>
                                <Typography className={classes.date}>{kwik.kwik_date}</Typography>
                                <Typography className={classes.content}>{kwik.content}</Typography>
                                <div className={classes.sideBlock}>
                                    <Typography className={classes.likes} display="inline">
                                        <LikeKwik reLoad={loadData} isLiked={kwik.is_liked} likeThis={kwik.id} /> ({kwik.countedlikes})
                                    </Typography>
                                    <Typography className={classes.comments} display="inline">Comments ({kwik.countedcomments})</Typography>
                                </div>
                            </Paper>
                        </Link>
                    </Grid>
                );
            })}
        </Grid>
    )
}