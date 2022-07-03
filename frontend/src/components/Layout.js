import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";
import { isLoggedIn } from "../helpers/login-helpers";
import { Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    leftMenu: {
        display: 'flex',
        justifyContent: 'flex-end' 
    }
}));

export default function Layout(props) {
    const classes = useStyles();
    const islogged = isLoggedIn();

    if (!islogged) return (<Navigate to="/" />);
    return (
        <div className={classes.root}>
            <Grid container direction='row' justifyContent="center">
                <Grid item xs>
                    <div className={classes.leftMenu}><LeftSide /></div>
                </Grid>
                <Grid item xs={4}>
                    {props.children}
                </Grid>
                <Grid item xs md>
                    <RightSide />
                </Grid>
            </Grid>
        </div>
    )
}